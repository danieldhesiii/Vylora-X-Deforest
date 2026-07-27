import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Logo } from "@/components/decor";
import { site } from "@/lib/site";

export function DashboardHeader({ admin = false }: { admin?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-forest/10 bg-paper-soft/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <Logo className="h-8 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight text-forest">
            {site.name}
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-forest/70 transition-colors hover:text-forest"
          >
            My filings
          </Link>
          {admin && (
            <Link
              href="/admin"
              className="text-sm font-semibold text-moss transition-colors hover:text-forest"
            >
              Admin
            </Link>
          )}
          <UserButton />
        </div>
      </div>
    </header>
  );
}
