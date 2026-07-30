"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import {
  createRequest,
  updateRequestDetails,
  addDocument,
  getRequest,
  setStatus,
  type FilingStatus,
} from "@/lib/filings";
import type {
  FilingRole,
  SupplierEntry,
  DdsReference,
} from "@/lib/filing-types";
import { emptySupplier, emptyDdsReference } from "@/lib/filing-types";
import { isAdminEmail } from "@/lib/admin";
import { sendEmail, adminRecipients, appUrl } from "@/lib/notify";

async function requireUser() {
  const user = await currentUser();
  if (!user) throw new Error("Not signed in");
  const email =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    null;
  return { id: user.id, email, isAdmin: isAdminEmail(email) };
}

function filesFrom(formData: FormData): File[] {
  return formData
    .getAll("files")
    .filter((f): f is File => f instanceof File && f.size > 0);
}

function str(formData: FormData, key: string): string | null {
  const v = String(formData.get(key) ?? "").trim();
  return v || null;
}

// Repeatable rows arrive as a JSON string from a hidden input, kept in sync by
// the client form. Parse defensively and drop entirely-empty rows.
function parseRows<T extends Record<string, string>>(
  raw: FormDataEntryValue | null,
  empty: () => T
): T[] {
  if (typeof raw !== "string" || !raw.trim()) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  const keys = Object.keys(empty()) as (keyof T)[];
  return parsed
    .map((row) => {
      const clean = empty();
      if (row && typeof row === "object") {
        for (const k of keys) {
          const val = (row as Record<string, unknown>)[k as string];
          clean[k] = (typeof val === "string" ? val.trim() : "") as T[keyof T];
        }
      }
      return clean;
    })
    .filter((row) => keys.some((k) => row[k] !== ""));
}

// Shared parsing for create + edit, so the two never drift apart.
function parseFilingFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("A title is required");

  const role = String(formData.get("role") ?? "") as FilingRole;
  if (role !== "operator" && role !== "downstream") {
    throw new Error("Please choose whether you're an operator or downstream buyer");
  }

  const suppliers: SupplierEntry[] =
    role === "operator"
      ? parseRows(formData.get("suppliers"), emptySupplier)
      : [];
  const ddsReferences: DdsReference[] =
    role === "downstream"
      ? parseRows(formData.get("dds_references"), emptyDdsReference)
      : [];

  return {
    title,
    notes: str(formData, "notes"),
    role,
    orgName: str(formData, "org_name"),
    businessAddress: str(formData, "business_address"),
    eoriNumber: str(formData, "eori_number"),
    contactName: str(formData, "contact_name"),
    contactEmail: str(formData, "contact_email"),
    commodity: str(formData, "commodity"),
    productDescription: str(formData, "product_description"),
    hsCode: str(formData, "hs_code"),
    quantity: str(formData, "quantity"),
    countryOfProduction: str(formData, "country_of_production"),
    productionRegion: str(formData, "production_region"),
    suppliers,
    ddsReferences,
  };
}

export async function createFilingRequestAction(formData: FormData) {
  const user = await requireUser();
  const fields = parseFilingFields(formData);

  const req = await createRequest({
    ownerId: user.id,
    ownerEmail: user.email,
    ...fields,
  });
  const title = fields.title;
  const recipients = adminRecipients();
  if (recipients.length) {
    await sendEmail({
      to: recipients,
      subject: `New Deforest filing: ${title}`,
      text: `${user.email ?? "A client"} started a new filing "${title}".\n\nReview it: ${appUrl(`/dashboard/${req.id}`)}`,
    });
  }
  revalidatePath("/dashboard");
  redirect(`/dashboard/${req.id}`);
}

export async function updateFilingDetailsAction(formData: FormData) {
  const user = await requireUser();
  const requestId = String(formData.get("request_id") ?? "");
  const req = await getRequest(requestId);
  if (!req) throw new Error("Filing request not found");
  if (req.owner_id !== user.id && !user.isAdmin) throw new Error("Not allowed");

  const fields = parseFilingFields(formData);
  await updateRequestDetails(requestId, user.email ?? user.id, fields);

  revalidatePath(`/dashboard/${requestId}`);
  revalidatePath("/dashboard");
  redirect(`/dashboard/${requestId}`);
}

export async function uploadClientDocumentAction(formData: FormData) {
  const user = await requireUser();
  const requestId = String(formData.get("request_id") ?? "");
  const req = await getRequest(requestId);
  if (!req) throw new Error("Filing request not found");
  if (req.owner_id !== user.id && !user.isAdmin) throw new Error("Not allowed");

  for (const file of filesFrom(formData)) {
    await addDocument({
      filingRequestId: requestId,
      ownerId: req.owner_id,
      direction: "client_upload",
      file,
      actor: user.email ?? user.id,
    });
  }
  revalidatePath(`/dashboard/${requestId}`);
}

// ---- Admin (Deforest team) --------------------------------------------
export async function deliverPackAction(formData: FormData) {
  const user = await requireUser();
  if (!user.isAdmin) throw new Error("Admins only");
  const requestId = String(formData.get("request_id") ?? "");
  const req = await getRequest(requestId);
  if (!req) throw new Error("Filing request not found");

  const files = filesFrom(formData);
  for (const file of files) {
    await addDocument({
      filingRequestId: requestId,
      ownerId: req.owner_id,
      direction: "deforest_delivery",
      file,
      actor: "deforest",
    });
  }
  if (files.length > 0) {
    await setStatus(requestId, "pack_ready", "deforest");
    if (req.owner_email) {
      await sendEmail({
        to: req.owner_email,
        subject: `Your Deforest filing pack is ready: ${req.title}`,
        text: `Your filing-ready pack for "${req.title}" is ready to download.\n\nOpen it: ${appUrl(`/dashboard/${requestId}`)}\n\nRemember: you submit the pack in TRACES yourself.`,
      });
    }
  }
  revalidatePath(`/dashboard/${requestId}`);
  revalidatePath("/admin");
}

export async function updateStatusAction(formData: FormData) {
  const user = await requireUser();
  if (!user.isAdmin) throw new Error("Admins only");
  const requestId = String(formData.get("request_id") ?? "");
  const status = String(formData.get("status") ?? "") as FilingStatus;
  await setStatus(requestId, status, "deforest");
  revalidatePath(`/dashboard/${requestId}`);
  revalidatePath("/admin");
}
