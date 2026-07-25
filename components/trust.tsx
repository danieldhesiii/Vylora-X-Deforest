import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { trust } from "@/lib/site";

export function Trust() {
  return (
    <section className="relative overflow-hidden bg-forest-deep py-24 text-paper-soft sm:py-28">
      <div className="grid-dots absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-signal/15 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-moss/25 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-signal-soft">{trust.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-paper-soft sm:text-4xl lg:text-[2.75rem]">
            {trust.title}
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trust.cards.map((card) => (
            <RevealItem key={card.title}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-signal/30 hover:bg-white/[0.07]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-signal/15 text-signal-soft">
                  <Icon name={card.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-paper-soft">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-soft/70">{card.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
