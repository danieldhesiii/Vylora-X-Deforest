"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CircleCheck, CircleAlert, CircleX, ChevronRight, FileSearch } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { trafficLight } from "@/lib/site";

const config = {
  clear: {
    Icon: CircleCheck,
    text: "text-clear",
    bg: "bg-clear/10",
    ring: "ring-clear/25",
    dot: "bg-clear",
    border: "border-clear/30",
  },
  review: {
    Icon: CircleAlert,
    text: "text-review",
    bg: "bg-review/10",
    ring: "ring-review/25",
    dot: "bg-review",
    border: "border-review/30",
  },
  flagged: {
    Icon: CircleX,
    text: "text-flag",
    bg: "bg-flag/10",
    ring: "ring-flag/25",
    dot: "bg-flag",
    border: "border-flag/30",
  },
} as const;

export function TrafficLight() {
  const [active, setActive] = useState(2); // start on the flagged plot — honesty first
  const current = trafficLight.plots[active];
  const c = config[current.status as keyof typeof config];

  return (
    <section className="relative overflow-hidden bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* copy */}
          <Reveal>
            <p className="eyebrow text-moss">{trafficLight.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-forest sm:text-4xl lg:text-[2.6rem]">
              {trafficLight.title}
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {trafficLight.body}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {[
                { k: "clear", l: "Clear" },
                { k: "review", l: "Review" },
                { k: "flagged", l: "Flagged" },
              ].map(({ k, l }) => {
                const cc = config[k as keyof typeof config];
                return (
                  <div key={k} className="inline-flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${cc.dot}`} />
                    <span className="text-sm font-medium text-forest/80">{l}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-forest/10 bg-paper-soft p-5 shadow-soft">
              <p className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                <FileSearch className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
                We store every raw Whisp response verbatim. You always see the underlying
                report — the traffic light is a summary, never a substitute.
              </p>
            </div>
          </Reveal>

          {/* interactive plot panel */}
          <Reveal delay={0.1}>
            <div className="rounded-4xl border border-forest/10 bg-paper-soft p-4 shadow-lift sm:p-5">
              {/* plot selector rows */}
              <div className="space-y-2.5">
                {trafficLight.plots.map((plot, i) => {
                  const pc = config[plot.status as keyof typeof config];
                  const selected = i === active;
                  return (
                    <button
                      key={plot.id}
                      onClick={() => setActive(i)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-all ${
                        selected
                          ? `${pc.border} ${pc.bg} shadow-soft`
                          : "border-forest/8 bg-paper hover:border-forest/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <pc.Icon className={`h-5 w-5 ${pc.text}`} />
                        <div className="leading-tight">
                          <p className="text-sm font-semibold text-forest">{plot.id}</p>
                          <p className="text-xs text-faint">{plot.origin}</p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          selected ? "rotate-90 text-forest" : "text-faint"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* detail panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-4 rounded-3xl border p-6 ${c.border} ${c.bg}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-full ring-1 ${c.bg} ${c.ring}`}>
                      <c.Icon className={`h-6 w-6 ${c.text}`} />
                    </span>
                    <div>
                      <p className={`font-display text-lg font-semibold ${c.text}`}>{current.label}</p>
                      <p className="text-xs font-medium uppercase tracking-wider text-faint">
                        {current.id} · {current.origin}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-forest/80">{current.detail}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-muted">
                    <span className="rounded-full bg-forest/5 px-2.5 py-1">Cut-off: 31 Dec 2020</span>
                    <span className="rounded-full bg-forest/5 px-2.5 py-1">Source: UN FAO Whisp</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
