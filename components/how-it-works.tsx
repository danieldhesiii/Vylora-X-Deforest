import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { howItWorks } from "@/lib/site";

export function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden bg-paper py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-40 -z-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-signal-soft/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-moss">{howItWorks.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-forest sm:text-4xl lg:text-[2.75rem]">
            {howItWorks.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {howItWorks.subtitle}
          </p>
        </Reveal>

        <RevealGroup className="relative mt-16 grid gap-6 lg:grid-cols-4">
          {/* connecting line on desktop */}
          <div className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-forest/15 to-transparent lg:block" />

          {howItWorks.steps.map((s) => (
            <RevealItem key={s.n}>
              <div className="group relative h-full rounded-3xl border border-forest/10 bg-paper-soft p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-paper-soft shadow-lg shadow-forest/20 transition-colors group-hover:bg-signal">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </div>
                  <span className="font-display text-4xl font-bold text-forest/10 transition-colors group-hover:text-signal/25">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-forest">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
