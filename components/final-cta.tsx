import { CalendarClock, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Countdown } from "@/components/countdown";
import { finalCta, site, deadlines } from "@/lib/site";
import { Divider } from "@/components/decor";

export function FinalCta() {
  return (
    <section id="contact" className="relative bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <div className="rounded-4xl border border-forest/10 bg-paper-soft p-8 shadow-soft sm:p-14">
            <p className="eyebrow text-flag">{finalCta.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-forest sm:text-5xl">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {finalCta.body}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={site.signupUrl}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-signal px-7 py-4 text-base font-semibold text-white shadow-soft transition-colors hover:bg-signal-bright sm:w-auto"
              >
                {finalCta.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={site.demoUrl}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-forest/25 bg-paper-soft px-7 py-4 text-base font-semibold text-forest transition-colors hover:bg-paper-deep sm:w-auto"
              >
                <CalendarClock className="h-5 w-5" />
                {finalCta.secondaryCta}
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
