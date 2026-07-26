import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { Logo } from "@/components/decor";
import { site } from "@/lib/site";

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName ?? user?.emailAddresses[0]?.emailAddress ?? "there";

  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-forest/10 bg-paper-soft/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="font-display text-lg font-semibold tracking-tight text-forest">
              {site.name}
            </span>
          </div>
          <UserButton />
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-forest">
          Welcome back, {firstName}.
        </h1>
        <p className="mt-2 text-forest/70">
          This is your Deforest dashboard. Supplier intake, forest checks and your
          filing-ready pack will live here.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-forest/10 bg-paper-soft p-6 shadow-soft">
            <h2 className="font-display text-lg font-semibold text-forest">
              Supplier data
            </h2>
            <p className="mt-2 text-sm text-forest/70">
              No suppliers added yet. Upload a GeoJSON/KML file or drop a pin to get
              started.
            </p>
          </div>
          <div className="rounded-3xl border border-forest/10 bg-paper-soft p-6 shadow-soft">
            <h2 className="font-display text-lg font-semibold text-forest">
              Forest check
            </h2>
            <p className="mt-2 text-sm text-forest/70">
              Run the UN FAO Whisp check once you have plots on file.
            </p>
          </div>
          <div className="rounded-3xl border border-forest/10 bg-paper-soft p-6 shadow-soft">
            <h2 className="font-display text-lg font-semibold text-forest">
              Filing pack
            </h2>
            <p className="mt-2 text-sm text-forest/70">
              Your due-diligence pack will assemble here as data comes in.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
