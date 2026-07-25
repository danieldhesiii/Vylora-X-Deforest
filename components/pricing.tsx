import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { pricing, site } from "@/lib/site";

export function Pricing() {
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
          {pricing.plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-4xl border p-8 ${
                  plan.highlight
                    ? "border-signal/40 bg-forest text-paper-soft shadow-lift lg:-translate-y-3"
                    : "border-forest/10 bg-paper-soft shadow-soft"
                }`}
              >
                {plan.highlight && (
                  <div className="grid-dots pointer-events-none absolute inset-0 opacity-25" />
                )}

                {plan.badge && (
                  <span
                    className={`relative mb-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                      plan.highlight
                        ? "bg-signal/20 text-signal-soft"
                        : "bg-forest/5 text-moss"
                    }`}
                  >
                    {plan.highlight && <Sparkles className="h-3.5 w-3.5" />}
                    {plan.badge}
                  </span>
                )}

                <h3
                  className={`relative font-display text-xl font-semibold ${
                    plan.highlight ? "text-paper-soft" : "text-forest"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`relative mt-1.5 text-sm leading-snug ${
                    plan.highlight ? "text-paper-soft/70" : "text-muted"
                  }`}
                >
                  {plan.tagline}
                </p>

                <div className="relative mt-6 flex items-end gap-1">
                  <span
                    className={`font-display text-4xl font-bold ${
                      plan.highlight ? "text-paper-soft" : "text-forest"
                    }`}
                  >
                    {plan.priceFrom}
                  </span>
                  {plan.priceTo && (
                    <span
                      className={`mb-1 text-lg font-medium ${
                        plan.highlight ? "text-paper-soft/60" : "text-faint"
                      }`}
                    >
                      –{plan.priceTo}
                    </span>
                  )}
                  <span
                    className={`mb-1.5 text-sm ${
                      plan.highlight ? "text-paper-soft/60" : "text-muted"
                    }`}
                  >
                    {plan.unit}
                  </span>
                </div>

                <a
                  href={site.demoUrl}
                  className={`relative mt-6 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-all ${
                    plan.highlight
                      ? "bg-signal text-white hover:bg-signal-bright hover:shadow-lg hover:shadow-signal/30"
                      : "bg-forest text-paper-soft hover:bg-forest-deep"
                  }`}
                >
                  {plan.cta}
                </a>

                <ul
                  className={`relative mt-7 space-y-3 border-t pt-6 ${
                    plan.highlight ? "border-white/15" : "border-forest/10"
                  }`}
                >
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          plan.highlight ? "text-signal-soft" : "text-signal"
                        }`}
                      />
                      <span className={plan.highlight ? "text-paper-soft/85" : "text-forest/85"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <p className="text-center text-xs leading-relaxed text-faint">{pricing.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
