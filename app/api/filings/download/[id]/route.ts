import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { signedUrlFor, logAudit, type FilingDocument } from "@/lib/filings";
import { isAdminEmail } from "@/lib/admin";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await currentUser();
  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  const email =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    null;
  const admin = isAdminEmail(email);

  const { data } = await supabaseAdmin()
    .from("documents")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  const doc = data as FilingDocument | null;
  if (!doc) return new NextResponse("Not found", { status: 404 });
  if (doc.owner_id !== user.id && !admin) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const url = await signedUrlFor(doc.storage_path);
  await logAudit({
    filingRequestId: doc.filing_request_id,
    ownerId: doc.owner_id,
    actor: email ?? user.id,
    action: "downloaded_document",
    detail: { file_name: doc.file_name },
  });
  return NextResponse.redirect(url);
}
