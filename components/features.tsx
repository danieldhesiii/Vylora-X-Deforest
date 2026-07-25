import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { features } from "@/lib/site";

export function Features() {
  return (
    <section id="features" className="relative bg-paper-deep/40 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-moss">{features.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-forest sm:text-4xl lg:text-[2.75rem]">
            {features.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {features.subtitle}
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {features.items.map((f, i) => {
            // First two cards each span 3 cols (big); remaining three span 2.
            const span = i < 2 ? "lg:col-span-3" : "lg:col-span-2";
            const feature = i < 2;
            return (
              <RevealItem key={f.title} className={span}>
                <div
                  className={`group flex h-full flex-col rounded-3xl border border-forest/10 bg-paper-soft p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-signal/25 hover:shadow-lift ${
                    feature ? "sm:p-8" : ""
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/5 text-forest transition-colors group-hover:bg-signal/10 group-hover:text-signal">
                    <Icon name={f.icon} className="h-6 w-6" />
                  </div>
                  <h3
                    className={`mt-5 font-display font-semibold text-forest ${
                      feature ? "text-xl" : "text-lg"
                    }`}
                  >
                    {f.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{f.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm text-muted">
            Deliberately not in version one: ERP integrations, chart dashboards, team
            permissions, machine filing. Just the work the regulation actually asks of you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
