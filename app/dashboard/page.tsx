import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, FolderOpen, Info } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { createFilingRequestAction } from "./actions";
import { listRequestsForOwner } from "@/lib/filings";
import { supabaseConfigured } from "@/lib/supabase";
import { isAdminEmail } from "@/lib/admin";

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName ?? "there";
  const email = user?.primaryEmailAddress?.emailAddress ?? null;
  const admin = isAdminEmail(email);
  const configured = supabaseConfigured();
  const requests = configured && user ? await listRequestsForOwner(user.id) : [];

  const inputCls =
    "w-full rounded-2xl border border-forest/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-signal focus:ring-2 focus:ring-signal/15";

  return (
    <main className="min-h-screen bg-paper">
      <DashboardHeader admin={admin} />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-forest">
          Welcome back, {firstName}.
        </h1>
        <p className="mt-2 max-w-2xl text-forest/70">
          Upload your supplier documents and we&apos;ll prepare your filing-ready
          EUDR pack. When it&apos;s ready you&apos;ll download it here and submit it
          in TRACES yourself.
        </p>

        {!configured && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-review/25 bg-review/5 p-4 text-sm text-forest/80">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-review" />
            <span>
              Almost ready: add the Supabase <code>SUPABASE_SERVICE_ROLE_KEY</code>{" "}
              in the project&apos;s environment variables to switch this dashboard on.
            </span>
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* New filing request */}
          <section className="rounded-4xl border border-forest/10 bg-paper-soft p-6 shadow-soft sm:p-7">
            <h2 className="font-display text-lg font-semibold text-forest">
              Start a new filing
            </h2>
            <p className="mt-1 text-sm text-muted">
              Give it a name; you&apos;ll add documents on the next screen.
            </p>
            <form action={createFilingRequestAction} className="mt-5 space-y-3">
              <div>
                <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-forest">
                  Filing name
                </label>
                <input
                  id="title"
                  name="title"
                  required
                  className={inputCls}
                  placeholder="e.g. Q3 Colombia coffee shipment"
                />
              </div>
              <div>
                <label htmlFor="org_name" className="mb-1.5 block text-sm font-medium text-forest">
                  Your business (optional)
                </label>
                <input
                  id="org_name"
                  name="org_name"
                  className={inputCls}
                  placeholder="Company name"
                />
              </div>
              <div>
                <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-forest">
                  Notes for our team (optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className={`${inputCls} resize-none`}
                  placeholder="Anything we should know about this shipment…"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-signal-bright"
              >
                Create filing
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </section>

          {/* Existing filings */}
          <section>
            <h2 className="font-display text-lg font-semibold text-forest">Your filings</h2>
            {requests.length === 0 ? (
              <div className="mt-4 flex flex-col items-center justify-center rounded-4xl border border-dashed border-forest/20 bg-paper-soft/60 p-10 text-center">
                <FolderOpen className="h-8 w-8 text-sage" />
                <p className="mt-3 text-sm text-muted">
                  No filings yet. Create one to upload your documents.
                </p>
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {requests.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/dashboard/${r.id}`}
                      className="flex items-center justify-between gap-4 rounded-3xl border border-forest/10 bg-paper-soft p-5 shadow-soft transition-colors hover:border-signal/30"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-display text-base font-semibold text-forest">
                          {r.title}
                        </p>
                        <p className="mt-0.5 text-xs text-faint">
                          Created {new Date(r.created_at).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <StatusBadge status={r.status} />
                        <ArrowRight className="h-4 w-4 text-faint" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
