import Link from "next/link";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Inbox } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { listAllRequests } from "@/lib/filings";
import { isAdminEmail } from "@/lib/admin";

export default async function AdminPage() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? null;
  if (!isAdminEmail(email)) notFound();

  const requests = await listAllRequests();

  return (
    <main className="min-h-screen bg-paper">
      <DashboardHeader admin />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex items-center gap-2 text-forest">
          <Inbox className="h-6 w-6 text-moss" />
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            All client submissions
          </h1>
        </div>
        <p className="mt-2 max-w-2xl text-forest/70">
          Every filing request across all clients. Open one to download their
          documents and deliver the finished pack.
        </p>

        {requests.length === 0 ? (
          <div className="mt-8 rounded-4xl border border-dashed border-forest/20 bg-paper-soft/60 p-10 text-center text-sm text-muted">
            No submissions yet.
          </div>
        ) : (
          <ul className="mt-8 space-y-3">
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
                    <p className="mt-0.5 truncate text-xs text-faint">
                      {r.owner_email ?? r.owner_id}
                      {r.org_name ? ` · ${r.org_name}` : ""} · {" "}
                      {new Date(r.created_at).toLocaleDateString("en-GB")}
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
      </div>
    </main>
  );
}
