"use client";

import { motion } from "motion/react";
import { ArrowRight, Check, CalendarClock, Satellite } from "lucide-react";
import { Countdown } from "@/components/countdown";
import { hero, site, deadlines } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-paper pt-28 pb-20"
    >
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-forest/15 bg-paper-soft px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            <span className="eyebrow text-[0.62rem] text-forest">{hero.eyebrow}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-forest sm:text-6xl lg:text-[4.1rem]"
          >
            {hero.titleLead}{" "}
            <span className="italic text-signal">{hero.titleAccent}</span>{" "}
            {hero.titleTail}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg lg:mx-0"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <a
              href={site.demoUrl}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-signal px-7 py-4 text-base font-semibold text-white shadow-soft transition-colors hover:bg-signal-bright sm:w-auto"
            >
              <CalendarClock className="h-5 w-5" />
              {hero.primaryCta}
            </a>
            <a
              href="#how"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-forest/25 bg-paper-soft px-7 py-4 text-base font-semibold text-forest transition-colors hover:bg-paper-deep sm:w-auto"
            >
              {hero.secondaryCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.42 }}
            className="mt-7 flex flex-col items-center gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2 lg:justify-start"
          >
            {hero.trustPoints.map((t) => (
              <li key={t} className="inline-flex items-center gap-2 text-sm font-medium text-forest/80">
                <Check className="h-4 w-4 shrink-0 text-signal" />
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-forest/10 pt-7 lg:mx-0"
          >
            {hero.stats.map((s) => (
              <div key={s.l} className="text-center lg:text-left">
                <dt className="font-display text-2xl font-semibold text-forest sm:text-[1.7rem]">{s.n}</dt>
                <dd className="mt-1 text-xs font-medium leading-snug text-muted">{s.l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* product visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <ForestCheckCard />

          {/* floating deadline badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease }}
            className="absolute -bottom-7 -left-3 rounded-2xl border border-forest/10 bg-paper-soft/95 p-4 shadow-lift backdrop-blur sm:-left-8"
          >
            <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-flag">
              <CalendarClock className="h-3.5 w-3.5" />
              Small-business deadline · {deadlines.smb.dateDisplay}
            </p>
            <div className="mt-2.5">
              <Countdown iso={deadlines.smb.date} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* --- The animated dashboard mock shown in the hero --------------- */
function ForestCheckCard() {
  const rows = [
    { id: "Plot A · 2.1 ha", place: "Huila, CO", tone: "clear", txt: "No deforestation detected" },
    { id: "Plot B · 6.8 ha", place: "Lampung, ID", tone: "review", txt: "Needs review" },
    { id: "Plot C · 4.4 ha", place: "Nariño, CO", tone: "flag", txt: "Risk flagged" },
  ] as const;

  const dot: Record<string, string> = {
    clear: "bg-clear",
    review: "bg-review",
    flag: "bg-flag",
  };
  const chip: Record<string, string> = {
    clear: "text-clear bg-clear/10 ring-clear/20",
    review: "text-review bg-review/10 ring-review/20",
    flag: "text-flag bg-flag/10 ring-flag/20",
  };

  return (
    <div className="relative rounded-[2rem] border border-forest/10 bg-paper-soft shadow-lift ring-hairline">
      {/* window header */}
      <div className="flex items-center justify-between border-b border-forest/10 px-5 py-3.5">
        <div className="flex items-center gap-2 text-forest">
          <Satellite className="h-4 w-4 text-signal" />
          <span className="text-sm font-semibold">Forest check</span>
        </div>
        <span className="rounded-full bg-forest/5 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-moss">
          Powered by Whisp
        </span>
      </div>

      {/* satellite plot map (static) */}
      <div className="relative flex items-center justify-center overflow-hidden bg-forest px-6 py-9">
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 rounded-full border border-white/15" />
          <div className="absolute inset-4 rounded-full border border-white/12" />
          <div className="absolute inset-8 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />
          <span className="absolute left-8 top-9 h-2.5 w-2.5 rounded-full bg-clear ring-2 ring-clear/25" />
          <span className="absolute right-9 top-12 h-2.5 w-2.5 rounded-full bg-review ring-2 ring-review/25" />
          <span className="absolute bottom-9 left-14 h-2.5 w-2.5 rounded-full bg-flag ring-2 ring-flag/25" />
        </div>
      </div>

      {/* plot rows */}
      <div className="space-y-2 p-4">
        {rows.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.15, ease }}
            className="flex items-center justify-between rounded-xl border border-forest/8 bg-paper px-3.5 py-3"
          >
            <div className="flex items-center gap-3">
              <span className={`h-2.5 w-2.5 rounded-full ${dot[r.tone]}`} />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-forest">{r.id}</p>
                <p className="text-xs text-faint">{r.place}</p>
              </div>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold ring-1 ${chip[r.tone]}`}>
              {r.txt}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
