import "server-only";

/**
 * Best-effort email notifications via Resend's HTTP API.
 * No-ops when RESEND_API_KEY is absent, so the workflow ships without it.
 * Never throws — a failed notification must not block a filing.
 */
export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  text: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const from = process.env.NOTIFY_FROM_EMAIL ?? "Deforest <onboarding@resend.dev>";
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: opts.to, subject: opts.subject, text: opts.text }),
    });
  } catch {
    /* best-effort */
  }
}

export function adminRecipients(): string[] {
  return (process.env.DEFOREST_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

export function appUrl(path = ""): string {
  const base =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://vylora-x-deforest.vercel.app";
  return `${base}${path}`;
}
