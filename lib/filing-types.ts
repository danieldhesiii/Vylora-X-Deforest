// Pure types & labels — safe to import from client OR server components.

export type FilingStatus =
  | "draft"
  | "submitted"
  | "in_review"
  | "pack_ready"
  | "closed";

export const STATUS_LABEL: Record<FilingStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  in_review: "In review",
  pack_ready: "Pack ready",
  closed: "Closed",
};

export type FilingRequest = {
  id: string;
  owner_id: string;
  owner_email: string | null;
  org_name: string | null;
  title: string;
  notes: string | null;
  status: FilingStatus;
  created_at: string;
  updated_at: string;
};

export type FilingDocument = {
  id: string;
  filing_request_id: string;
  owner_id: string;
  direction: "client_upload" | "deforest_delivery";
  kind: string | null;
  storage_path: string;
  file_name: string;
  content_type: string | null;
  size_bytes: number | null;
  uploaded_by: string | null;
  created_at: string;
};

export function formatBytes(n: number | null): string {
  if (!n) return "";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
