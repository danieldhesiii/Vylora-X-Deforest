import "server-only";

/**
 * Deforest team members who can see every client's submissions and deliver
 * finished packs. Set DEFOREST_ADMIN_EMAILS (comma-separated) in the env.
 */
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const list = (process.env.DEFOREST_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}
