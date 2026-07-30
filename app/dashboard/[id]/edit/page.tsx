import Link from "next/link";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { NewFilingForm } from "@/components/dashboard/new-filing-form";
import { getRequest } from "@/lib/filings";
import { isAdminEmail } from "@/lib/admin";
import { updateFilingDetailsAction } from "../../actions";

export default async function EditFilingPage({
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

  return (
    <main className="min-h-screen bg-paper">
      <DashboardHeader admin={admin} />
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <Link
          href={`/dashboard/${id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-forest"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to filing
        </Link>

        <div className="mt-4">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-forest sm:text-3xl">
            Edit filing details
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Update anything that&apos;s changed. Documents are managed on the
            filing page — this just edits the details.
          </p>
        </div>

        <div className="mt-8 rounded-4xl border border-forest/10 bg-paper-soft p-6 shadow-soft sm:p-8">
          <NewFilingForm
            action={updateFilingDetailsAction}
            mode="edit"
            initial={request}
            requestId={request.id}
          />
        </div>
      </div>
    </main>
  );
}
