"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import {
  createRequest,
  addDocument,
  getRequest,
  setStatus,
  type FilingStatus,
} from "@/lib/filings";
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

export async function createFilingRequestAction(formData: FormData) {
  const user = await requireUser();
  const title = String(formData.get("title") ?? "").trim();
  const orgName = String(formData.get("org_name") ?? "").trim() || null;
  const notes = String(formData.get("notes") ?? "").trim() || null;
  if (!title) throw new Error("A title is required");

  const req = await createRequest({
    ownerId: user.id,
    ownerEmail: user.email,
    orgName,
    title,
    notes,
  });
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
