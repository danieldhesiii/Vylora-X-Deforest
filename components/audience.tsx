import { Check, Ship, Store, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { audience, site } from "@/lib/site";

const tagIcon = { operator: Ship, downstream: Store } as const;

export function Audience() {
  return (
    <section id="audience" className="relative bg-paper-deep/40 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-moss">{audience.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-forest sm:text-4xl lg:text-[2.75rem]">
            {audience.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {audience.paths.map((p, i) => {
            const TagIcon = tagIcon[p.id as keyof typeof tagIcon];
            return (
              <Reveal key={p.id} delay={i * 0.12}>
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-4xl border p-8 sm:p-9 ${
                    p.highlight
                      ? "border-signal/30 bg-forest text-paper-soft shadow-lift"
                      : "border-forest/10 bg-paper-soft shadow-soft"
                  }`}
                >
                  <div className="relative flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        p.highlight ? "bg-signal/20 text-signal-soft" : "bg-forest/5 text-forest"
                      }`}
                    >
                      <TagIcon className="h-6 w-6" />
                    </div>
                    <span
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                        p.highlight
                          ? "bg-signal/20 text-signal-soft"
                          : "bg-forest/5 text-moss"
                      }`}
                    >
                      {p.tag}
                    </span>
                  </div>

                  <h3
                    className={`relative mt-6 font-display text-2xl font-semibold ${
                      p.highlight ? "text-paper-soft" : "text-forest"
                    }`}
                  >
                    {p.title}
                  </h3>
                  <p
                    className={`relative mt-3 text-sm leading-relaxed ${
                      p.highlight ? "text-paper-soft/75" : "text-muted"
                    }`}
                  >
                    {p.body}
                  </p>

                  <ul className="relative mt-6 space-y-3">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-sm">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            p.highlight ? "text-signal-soft" : "text-signal"
                          }`}
                        />
                        <span className={p.highlight ? "text-paper-soft/90" : "text-forest/85"}>
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`relative mt-8 flex items-end justify-between border-t pt-6 ${
                      p.highlight ? "border-white/15" : "border-forest/10"
                    }`}
                  >
                    <div>
                      <span
                        className={`font-display text-3xl font-bold ${
                          p.highlight ? "text-paper-soft" : "text-forest"
                        }`}
                      >
                        {p.price}
                      </span>
                      <span className={p.highlight ? "text-paper-soft/60" : "text-muted"}>
                        {p.priceUnit}
                      </span>
                    </div>
                    <a
                      href={p.highlight ? site.signupUrl : site.demoUrl}
                      className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                        p.highlight
                          ? "bg-signal text-white hover:bg-signal-bright"
                          : "bg-forest text-paper-soft hover:bg-forest-deep"
                      }`}
                    >
                      {p.highlight ? "Get started" : "Book a demo"}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm text-muted">
            Not sure which one you are? That&apos;s the very first thing we work out with
            you. For many small businesses the answer is the lighter, downstream lane.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
