import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { pricing, site } from "@/lib/site";

function ctaHref(kind: string) {
  return kind === "signup" ? site.signupUrl : site.demoUrl;
}

export function Pricing() {
  const { downstream, operator, dwy } = pricing;

  return (
    <section id="pricing" className="relative bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-moss">{pricing.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-forest sm:text-4xl lg:text-[2.75rem]">
            {pricing.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {pricing.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-start">
          {/* Downstream — flat */}
          <Reveal delay={0}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-4xl border border-signal/40 bg-forest p-8 text-paper-soft shadow-lift">
              <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-signal/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-signal-soft">
                <Sparkles className="h-3.5 w-3.5" />
                {downstream.badge}
              </span>
              <h3 className="font-display text-xl font-semibold text-paper-soft">{downstream.name}</h3>
              <p className="mt-1.5 text-sm leading-snug text-paper-soft/70">{downstream.tagline}</p>

              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-4xl font-bold text-paper-soft">{downstream.price}</span>
                <span className="mb-1.5 text-sm text-paper-soft/60">{downstream.unit}</span>
              </div>
              <p className="mt-1.5 text-xs text-paper-soft/55">{downstream.annual}</p>

              <a
                href={ctaHref(downstream.ctaKind)}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-signal-bright"
              >
                {downstream.cta}
              </a>

              <ul className="mt-7 space-y-3 border-t border-white/15 pt-6">
                {downstream.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-soft" />
                    <span className="text-paper-soft/85">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Operator — volume tiers */}
          <Reveal delay={0.1}>
            <div className="relative flex h-full flex-col rounded-4xl border border-forest/10 bg-paper-soft p-8 shadow-soft">
              <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-forest/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-moss">
                Volume tiers
              </span>
              <h3 className="font-display text-xl font-semibold text-forest">{operator.name}</h3>
              <p className="mt-1.5 text-sm leading-snug text-muted">{operator.tagline}</p>

              {/* tier rows */}
              <div className="mt-6 space-y-2.5">
                {operator.tiers.map((t) => (
                  <div
                    key={t.name}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                      t.popular
                        ? "border-signal/40 bg-signal/[0.06]"
                        : "border-forest/12 bg-paper"
                    }`}
                  >
                    <div className="leading-tight">
                      <p className="flex items-center gap-2 text-sm font-semibold text-forest">
                        {t.name}
                        {t.popular && (
                          <span className="rounded-full bg-signal/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-signal">
                            Popular
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-faint">{t.filings}</p>
                    </div>
                    <p className="font-display text-lg font-bold text-forest">
                      {t.price}
                      <span className="text-xs font-medium text-muted">{operator.unit}</span>
                    </p>
                  </div>
                ))}
              </div>

              <a
                href={ctaHref(operator.ctaKind)}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-paper-soft transition-colors hover:bg-forest-deep"
              >
                {operator.cta}
              </a>

              <ul className="mt-7 space-y-3 border-t border-forest/10 pt-6">
                {operator.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                    <span className="text-forest/85">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Done-with-you — one-off */}
          <Reveal delay={0.2}>
            <div className="relative flex h-full flex-col rounded-4xl border border-forest/10 bg-paper-soft p-8 shadow-soft">
              <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-forest/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-moss">
                {dwy.badge}
              </span>
              <h3 className="font-display text-xl font-semibold text-forest">{dwy.name}</h3>
              <p className="mt-1.5 text-sm leading-snug text-muted">{dwy.tagline}</p>

              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-4xl font-bold text-forest">{dwy.price}</span>
                <span className="mb-1.5 text-sm text-muted">{dwy.unit}</span>
              </div>
              <p className="mt-1.5 text-xs text-faint">{dwy.note}</p>

              <a
                href={ctaHref(dwy.ctaKind)}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-paper-soft transition-colors hover:bg-forest-deep"
              >
                {dwy.cta}
              </a>

              <ul className="mt-7 space-y-3 border-t border-forest/10 pt-6">
                {dwy.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                    <span className="text-forest/85">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <p className="text-center text-xs leading-relaxed text-faint">{pricing.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
