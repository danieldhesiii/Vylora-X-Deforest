import "server-only";
import { supabaseAdmin, FILINGS_BUCKET } from "@/lib/supabase";
import type {
  FilingStatus,
  FilingRequest,
  FilingDocument,
} from "@/lib/filing-types";

export type { FilingStatus, FilingRequest, FilingDocument };

// ---- Audit -------------------------------------------------------------
export async function logAudit(input: {
  filingRequestId?: string | null;
  ownerId?: string | null;
  actor: string;
  action: string;
  detail?: Record<string, unknown>;
}) {
  await supabaseAdmin()
    .from("audit_events")
    .insert({
      filing_request_id: input.filingRequestId ?? null,
      owner_id: input.ownerId ?? null,
      actor: input.actor,
      action: input.action,
      detail: input.detail ?? {},
    });
}

// ---- Filing requests ---------------------------------------------------
export async function listRequestsForOwner(ownerId: string): Promise<FilingRequest[]> {
  const { data, error } = await supabaseAdmin()
    .from("filing_requests")
    .select("*")
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as FilingRequest[];
}

export async function listAllRequests(): Promise<FilingRequest[]> {
  const { data, error } = await supabaseAdmin()
    .from("filing_requests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as FilingRequest[];
}

export async function getRequest(id: string): Promise<FilingRequest | null> {
  const { data, error } = await supabaseAdmin()
    .from("filing_requests")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as FilingRequest) ?? null;
}

export async function createRequest(input: {
  ownerId: string;
  ownerEmail?: string | null;
  orgName?: string | null;
  title: string;
  notes?: string | null;
}): Promise<FilingRequest> {
  const { data, error } = await supabaseAdmin()
    .from("filing_requests")
    .insert({
      owner_id: input.ownerId,
      owner_email: input.ownerEmail ?? null,
      org_name: input.orgName ?? null,
      title: input.title,
      notes: input.notes ?? null,
      status: "submitted",
    })
    .select("*")
    .single();
  if (error) throw error;
  await logAudit({
    filingRequestId: data.id,
    ownerId: input.ownerId,
    actor: input.ownerEmail ?? input.ownerId,
    action: "created_request",
    detail: { title: input.title },
  });
  return data as FilingRequest;
}

export async function setStatus(id: string, status: FilingStatus, actor: string) {
  const { error } = await supabaseAdmin()
    .from("filing_requests")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
  await logAudit({ filingRequestId: id, actor, action: "status_changed", detail: { status } });
}

// ---- Documents ---------------------------------------------------------
export async function listDocuments(filingRequestId: string): Promise<FilingDocument[]> {
  const { data, error } = await supabaseAdmin()
    .from("documents")
    .select("*")
    .eq("filing_request_id", filingRequestId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as FilingDocument[];
}

export async function addDocument(input: {
  filingRequestId: string;
  ownerId: string;
  direction: FilingDocument["direction"];
  file: File;
  actor: string;
}): Promise<FilingDocument> {
  const supabase = supabaseAdmin();
  const safeName = input.file.name.replace(/[^\w.\-]+/g, "_").slice(0, 120);
  const path = `${input.ownerId}/${input.filingRequestId}/${input.direction}/${Date.now()}_${safeName}`;
  const bytes = new Uint8Array(await input.file.arrayBuffer());

  const { error: upErr } = await supabase.storage
    .from(FILINGS_BUCKET)
    .upload(path, bytes, {
      contentType: input.file.type || "application/octet-stream",
      upsert: false,
    });
  if (upErr) throw upErr;

  const { data, error } = await supabase
    .from("documents")
    .insert({
      filing_request_id: input.filingRequestId,
      owner_id: input.ownerId,
      direction: input.direction,
      kind: kindFromName(safeName),
      storage_path: path,
      file_name: input.file.name,
      content_type: input.file.type || null,
      size_bytes: input.file.size,
      uploaded_by: input.actor,
    })
    .select("*")
    .single();
  if (error) throw error;

  await logAudit({
    filingRequestId: input.filingRequestId,
    ownerId: input.ownerId,
    actor: input.actor,
    action: input.direction === "client_upload" ? "uploaded_document" : "delivered_pack",
    detail: { file_name: input.file.name, size: input.file.size },
  });
  return data as FilingDocument;
}

export async function signedUrlFor(storagePath: string): Promise<string> {
  const { data, error } = await supabaseAdmin()
    .storage.from(FILINGS_BUCKET)
    .createSignedUrl(storagePath, 120); // 2-minute link
  if (error) throw error;
  return data.signedUrl;
}

function kindFromName(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "geojson" || ext === "json") return "geojson";
  if (ext === "kml" || ext === "kmz") return "kml";
  if (ext === "pdf") return "document";
  if (["csv", "xlsx", "xls"].includes(ext)) return "spreadsheet";
  if (["png", "jpg", "jpeg", "webp"].includes(ext)) return "image";
  return "other";
}
