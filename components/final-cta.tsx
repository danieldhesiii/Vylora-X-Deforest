import { CalendarClock, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Countdown } from "@/components/countdown";
import { finalCta, site, deadlines } from "@/lib/site";
import { Divider } from "@/components/decor";

export function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden bg-paper py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-soft/15 blur-[130px]" />
        <div className="topo absolute inset-0 opacity-60" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <div className="rounded-[2.5rem] border border-forest/10 bg-paper-soft/80 p-8 shadow-lift backdrop-blur sm:p-14">
            <p className="eyebrow text-flag">{finalCta.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-forest sm:text-5xl">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {finalCta.body}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={site.demoUrl}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-signal px-7 py-4 text-base font-semibold text-white shadow-xl shadow-signal/25 transition-all hover:scale-[1.03] hover:bg-signal-bright sm:w-auto"
              >
                <CalendarClock className="h-5 w-5" />
                {finalCta.primaryCta}
              </a>
              <a
                href={site.waitlistUrl}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-forest/20 bg-paper-soft px-7 py-4 text-base font-semibold text-forest transition-all hover:border-forest/40 hover:bg-paper-deep sm:w-auto"
              >
                {finalCta.secondaryCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <Divider className="mt-12" />

            <div className="mt-8 flex flex-col items-center gap-3">
              <p className="text-sm font-medium text-muted">
                Small-business deadline · {deadlines.smb.dateDisplay}
              </p>
              <Countdown iso={deadlines.smb.date} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
