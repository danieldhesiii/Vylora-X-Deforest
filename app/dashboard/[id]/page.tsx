import Link from "next/link";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import {
  ArrowLeft,
  Building2,
  Download,
  FileText,
  Inbox,
  MapPin,
  PackageCheck,
  Pencil,
  ShieldCheck,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { UploadForm } from "@/components/dashboard/upload-form";
import { getRequest, listDocuments } from "@/lib/filings";
import {
  formatBytes,
  ROLE_LABEL,
  STATUS_LABEL,
  type FilingRequest,
  type FilingStatus,
} from "@/lib/filing-types";
import { isAdminEmail } from "@/lib/admin";
import {
  uploadClientDocumentAction,
  deliverPackAction,
  updateStatusAction,
} from "../actions";

export default async function FilingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? null;
  const admin = isAdminEmail(email);

  const request = await getRequest(id);
  if (!request) notFound();
  if (request.owner_id !== user?.id && !admin) notFound();

  const documents = await listDocuments(id);
  const uploads = documents.filter((d) => d.direction === "client_upload");
  const deliveries = documents.filter((d) => d.direction === "deforest_delivery");

  return (
    <main className="min-h-screen bg-paper">
      <DashboardHeader admin={admin} />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <Link
          href={admin ? "/admin" : "/dashboard"}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-forest"
        >
          <ArrowLeft className="h-4 w-4" />
          {admin ? "All submissions" : "My filings"}
        </Link>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-forest sm:text-3xl">
              {request.title}
            </h1>
            <p className="mt-1 text-sm text-faint">
              {request.org_name ? `${request.org_name} · ` : ""}
              Created {new Date(request.created_at).toLocaleDateString("en-GB")}
              {admin && request.owner_email ? ` · ${request.owner_email}` : ""}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href={`/dashboard/${request.id}/edit`}
              className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-paper px-4 py-2 text-sm font-medium text-forest transition-colors hover:border-signal/40 hover:text-signal"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit details
            </Link>
            <StatusBadge status={request.status} />
          </div>
        </div>

        {request.notes && (
          <p className="mt-4 rounded-2xl border border-forest/10 bg-paper-soft p-4 text-sm text-forest/80">
            {request.notes}
          </p>
        )}

        <ConsignmentDetails request={request} />

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
          {/* Client documents */}
          <section className="rounded-4xl border border-forest/10 bg-paper-soft p-6 shadow-soft">
            <div className="flex items-center gap-2 text-forest">
              <Inbox className="h-5 w-5 text-moss" />
              <h2 className="font-display text-lg font-semibold">Your documents</h2>
            </div>
            <p className="mt-1 text-sm text-muted">
              Upload supplier geolocation (GeoJSON/KML), statements, invoices and
              any supporting files.
            </p>

            {uploads.length > 0 && (
              <ul className="mt-5 space-y-2">
                {uploads.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-forest/10 bg-paper px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <FileText className="h-4 w-4 shrink-0 text-moss" />
                      <span className="truncate text-sm text-forest/85">{d.file_name}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-xs text-faint">{formatBytes(d.size_bytes)}</span>
                      <a
                        href={`/api/filings/download/${d.id}`}
                        className="text-muted transition-colors hover:text-forest"
                        aria-label={`Download ${d.file_name}`}
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5">
              <UploadForm
                action={uploadClientDocumentAction}
                requestId={request.id}
                label="Upload documents"
                tone="signal"
              />
            </div>
          </section>

          {/* Filing pack (deliveries) */}
          <section className="rounded-4xl border border-forest/10 bg-paper-soft p-6 shadow-soft">
            <div className="flex items-center gap-2 text-forest">
              <PackageCheck className="h-5 w-5 text-signal" />
              <h2 className="font-display text-lg font-semibold">Your filing pack</h2>
            </div>
            <p className="mt-1 text-sm text-muted">
              Once we&apos;ve prepared your pack it appears here to download, then
              you submit it in TRACES yourself.
            </p>

            {deliveries.length > 0 ? (
              <ul className="mt-5 space-y-2">
                {deliveries.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-clear/20 bg-clear/[0.06] px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <FileText className="h-4 w-4 shrink-0 text-clear" />
                      <span className="truncate text-sm text-forest/85">{d.file_name}</span>
                    </div>
                    <a
                      href={`/api/filings/download/${d.id}`}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-signal px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-signal-bright"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-dashed border-forest/20 bg-paper p-8 text-center">
                <ShieldCheck className="h-7 w-7 text-sage" />
                <p className="mt-3 text-sm text-muted">
                  Nothing to download yet. We&apos;ll notify you when your pack is
                  ready.
                </p>
              </div>
            )}
          </section>
        </div>

        {admin && <AdminPanel requestId={request.id} status={request.status} />}
      </div>
    </main>
  );
}

function DetailItem({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-faint">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-forest/85">{value}</dd>
    </div>
  );
}

function ConsignmentDetails({ request }: { request: FilingRequest }) {
  const hasBusiness =
    request.role ||
    request.org_name ||
    request.eori_number ||
    request.business_address ||
    request.contact_name ||
    request.contact_email;
  const hasGoods =
    request.commodity ||
    request.product_description ||
    request.hs_code ||
    request.quantity ||
    request.country_of_production ||
    request.production_region;

  if (!hasBusiness && !hasGoods) return null;

  return (
    <div className="mt-6 space-y-4">
      {hasBusiness && (
        <section className="rounded-4xl border border-forest/10 bg-paper-soft p-6 shadow-soft">
          <div className="flex items-center gap-2 text-forest">
            <Building2 className="h-5 w-5 text-moss" />
            <h2 className="font-display text-lg font-semibold">
              Business &amp; consignment
            </h2>
          </div>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem
              label="Role"
              value={request.role ? ROLE_LABEL[request.role] : null}
            />
            <DetailItem label="Legal business name" value={request.org_name} />
            <DetailItem label="EORI number" value={request.eori_number} />
            <DetailItem label="Business address" value={request.business_address} />
            <DetailItem label="Contact name" value={request.contact_name} />
            <DetailItem label="Contact email" value={request.contact_email} />
            <DetailItem label="Commodity" value={request.commodity} />
            <DetailItem
              label="Product description"
              value={request.product_description}
            />
            <DetailItem label="HS / customs code" value={request.hs_code} />
            <DetailItem label="Quantity" value={request.quantity} />
            <DetailItem
              label="Country of production"
              value={request.country_of_production}
            />
            <DetailItem label="Region" value={request.production_region} />
          </dl>
        </section>
      )}

      {request.suppliers.length > 0 && (
        <section className="rounded-4xl border border-forest/10 bg-paper-soft p-6 shadow-soft">
          <div className="flex items-center gap-2 text-forest">
            <MapPin className="h-5 w-5 text-moss" />
            <h2 className="font-display text-lg font-semibold">
              Suppliers &amp; plots
            </h2>
          </div>
          <div className="mt-4 space-y-3">
            {request.suppliers.map((s, i) => (
              <div
                key={i}
                className="rounded-3xl border border-forest/10 bg-paper p-4"
              >
                <p className="font-display text-sm font-semibold text-forest">
                  {s.supplier_name || `Supplier #${i + 1}`}
                </p>
                <dl className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <DetailItem label="Contact" value={s.contact} />
                  <DetailItem label="Country" value={s.country} />
                  <DetailItem label="Region" value={s.region} />
                  <DetailItem label="Hectares" value={s.hectares} />
                  <DetailItem label="Production period" value={s.production_period} />
                </dl>
                {s.plot_coordinates && (
                  <div className="mt-2">
                    <dt className="text-xs font-medium uppercase tracking-wide text-faint">
                      Plot coordinates
                    </dt>
                    <pre className="mt-1 whitespace-pre-wrap break-words rounded-xl bg-paper-deep/40 p-3 text-xs text-forest/80">
                      {s.plot_coordinates}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {request.dds_references.length > 0 && (
        <section className="rounded-4xl border border-forest/10 bg-paper-soft p-6 shadow-soft">
          <div className="flex items-center gap-2 text-forest">
            <FileText className="h-5 w-5 text-moss" />
            <h2 className="font-display text-lg font-semibold">
              Supplier reference numbers
            </h2>
          </div>
          <div className="mt-4 space-y-3">
            {request.dds_references.map((d, i) => (
              <div
                key={i}
                className="rounded-3xl border border-forest/10 bg-paper p-4"
              >
                <dl className="grid gap-3 sm:grid-cols-3">
                  <DetailItem
                    label="Supplier"
                    value={d.supplier_name || `Supplier #${i + 1}`}
                  />
                  <DetailItem label="DDS reference" value={d.dds_reference} />
                  <DetailItem
                    label="Verification number"
                    value={d.verification_number}
                  />
                </dl>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function AdminPanel({
  requestId,
  status,
}: {
  requestId: string;
  status: FilingStatus;
}) {
  const statuses: FilingStatus[] = [
    "submitted",
    "in_review",
    "pack_ready",
    "closed",
  ];
  return (
    <section className="mt-8 rounded-4xl border border-moss/30 bg-forest p-6 text-paper-soft shadow-lift sm:p-7">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-signal-soft" />
        <h2 className="font-display text-lg font-semibold text-paper-soft">
          Deforest team · deliver pack
        </h2>
      </div>
      <p className="mt-1 text-sm text-paper-soft/70">
        Upload the finished TRACES pack. Delivering a file sets the status to
        &quot;Pack ready&quot; and makes it downloadable for the client.
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-paper-soft p-5">
          <UploadForm
            action={deliverPackAction}
            requestId={requestId}
            label="Deliver finished pack"
            tone="forest"
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm font-medium text-paper-soft/80">Set status</p>
          <form action={updateStatusAction} className="mt-3 flex flex-wrap gap-2">
            <input type="hidden" name="request_id" value={requestId} />
            {statuses.map((s) => (
              <button
                key={s}
                type="submit"
                name="status"
                value={s}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  s === status
                    ? "bg-signal text-white"
                    : "bg-white/10 text-paper-soft/80 hover:bg-white/20"
                }`}
              >
                {STATUS_LABEL[s]}
              </button>
            ))}
          </form>
          <p className="mt-3 text-xs text-paper-soft/50">Current: {STATUS_LABEL[status]}</p>
        </div>
      </div>
    </section>
  );
}
