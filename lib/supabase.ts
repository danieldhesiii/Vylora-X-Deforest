import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key.
 *
 * RLS on every table is deny-all (no policies), so the service role is the
 * only way in — and it must never reach the browser. All access goes through
 * server actions / server components that filter by the caller's Clerk id.
 */
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || key === "REPLACE_WITH_SERVICE_ROLE_KEY") {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function supabaseConfigured() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      key &&
      key !== "REPLACE_WITH_SERVICE_ROLE_KEY"
  );
}

export const FILINGS_BUCKET = "filings";
