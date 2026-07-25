import { AlertTriangle } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { stakes } from "@/lib/site";

export function Stakes() {
  return (
    <section id="stakes" className="relative bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-moss">{stakes.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-forest sm:text-4xl lg:text-[2.75rem]">
            {stakes.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {stakes.intro}
          </p>
        </Reveal>

        {/* the four demands */}
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stakes.demands.map((d) => (
            <RevealItem key={d.title}>
              <div className="group h-full rounded-3xl border border-forest/10 bg-paper-soft p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/5 text-forest transition-colors group-hover:bg-signal/10 group-hover:text-signal">
                  <Icon name={d.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-forest">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* penalties */}
        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-4xl border border-flag/20 bg-flag/[0.04]">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-flag/10 px-3.5 py-1.5 text-flag">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">The downside</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold text-forest sm:text-3xl">
                  {stakes.penalties.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{stakes.penalties.note}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {stakes.penalties.items.map((p) => (
                  <div
                    key={p.label}
                    className="rounded-2xl border border-flag/15 bg-paper-soft p-5 text-center"
                  >
                    <p className="font-display text-2xl font-bold text-flag sm:text-[1.7rem]">{p.stat}</p>
                    <p className="mt-1.5 text-xs font-medium leading-snug text-muted">{p.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
