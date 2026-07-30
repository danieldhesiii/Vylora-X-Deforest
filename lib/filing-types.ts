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

export type FilingRole = "operator" | "downstream";

export const ROLE_LABEL: Record<FilingRole, string> = {
  operator: "Operator (first importer into the EU)",
  downstream: "Downstream buyer or trader",
};

// Commodities in scope of EUDR (Annex I).
export const COMMODITIES = [
  "Coffee",
  "Cocoa",
  "Timber / wood",
  "Rubber",
  "Cattle",
  "Soy",
  "Palm oil",
] as const;

// One supplier + its plot(s), captured by Operators for the geolocation
// requirement. Coordinates can be typed here and/or uploaded as GeoJSON/KML.
export type SupplierEntry = {
  supplier_name: string;
  contact: string;
  country: string;
  region: string;
  plot_coordinates: string;
  hectares: string;
  production_period: string;
};

// A supplier's existing Due Diligence Statement reference, captured by
// Downstream buyers — this is effectively their whole obligation.
export type DdsReference = {
  supplier_name: string;
  dds_reference: string;
  verification_number: string;
};

export function emptySupplier(): SupplierEntry {
  return {
    supplier_name: "",
    contact: "",
    country: "",
    region: "",
    plot_coordinates: "",
    hectares: "",
    production_period: "",
  };
}

export function emptyDdsReference(): DdsReference {
  return { supplier_name: "", dds_reference: "", verification_number: "" };
}

export type FilingRequest = {
  id: string;
  owner_id: string;
  owner_email: string | null;
  org_name: string | null;
  title: string;
  notes: string | null;
  status: FilingStatus;
  role: FilingRole | null;
  business_address: string | null;
  eori_number: string | null;
  contact_name: string | null;
  contact_email: string | null;
  commodity: string | null;
  product_description: string | null;
  hs_code: string | null;
  quantity: string | null;
  country_of_production: string | null;
  production_region: string | null;
  suppliers: SupplierEntry[];
  dds_references: DdsReference[];
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
