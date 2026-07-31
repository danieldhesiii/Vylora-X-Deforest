import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, FolderOpen, Info } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { NewFilingForm } from "@/components/dashboard/new-filing-form";
import { createFilingRequestAction } from "./actions";
import { listRequestsForOwner } from "@/lib/filings";
import { supabaseConfigured } from "@/lib/supabase";
import { isAdminEmail } from "@/lib/admin";

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName ?? "there";
  const email = user?.primaryEmailAddress?.emailAddress ?? null;
  // The Deforest team doesn't file on its own behalf — send them to the
  // all-submissions inbox rather than a client filing form.
  if (isAdminEmail(email)) redirect("/admin");
  const configured = supabaseConfigured();
  const requests = configured && user ? await listRequestsForOwner(user.id) : [];

  return (
    <main className="min-h-screen bg-paper">
      <DashboardHeader />
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

        {/* Existing filings */}
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-forest">Your filings</h2>
          {requests.length === 0 ? (
            <div className="mt-4 flex flex-col items-center justify-center rounded-4xl border border-dashed border-forest/20 bg-paper-soft/60 p-10 text-center">
              <FolderOpen className="h-8 w-8 text-sage" />
              <p className="mt-3 text-sm text-muted">
                No filings yet. Start one below to send us your details and documents.
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

        {/* New filing request */}
        {configured && (
          <section className="mt-10 rounded-4xl border border-forest/10 bg-paper-soft p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-xl font-semibold text-forest">
              Start a new filing
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-muted">
              Tell us who you are in the supply chain and the details of this
              consignment. The more complete this is, the faster we can build
              your filing-ready pack. You&apos;ll add documents on the next screen.
            </p>
            <div className="mt-6">
              <NewFilingForm action={createFilingRequestAction} />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
