import { Logo } from "@/components/decor";
import { site, footer } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-forest-deep text-paper-soft">
      <div className="grid-dots absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <Logo className="h-9 w-9 text-paper-soft" />
              <span className="font-display text-xl font-semibold tracking-tight text-paper-soft">
                {site.name}
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper-soft/60">
              {site.tagline} The workflow, record-keeping and filing-preparation tool for
              small businesses facing the EU Deforestation Regulation.
            </p>
            <a
              href={site.demoUrl}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-signal-bright"
            >
              Book a demo
            </a>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-signal-soft">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-paper-soft/65 transition-colors hover:text-paper-soft"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* legal disclaimer — the liability doctrine, stated plainly */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs leading-relaxed text-paper-soft/50">{footer.disclaimer}</p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-paper-soft/50">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-paper-soft/50">
            Built around the free UN FAO Whisp engine · Data hosted in the EU
          </p>
        </div>
      </div>
    </footer>
  );
}
