"use client";

import { useEffect, useState } from "react";

function parts(target: number, now: number) {
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);
  return { days, hours, mins, secs };
}

/** Live countdown to an ISO date. Renders 4 units; `tone` picks colours. */
export function Countdown({
  iso,
  tone = "light",
}: {
  iso: string;
  tone?: "light" | "dark";
}) {
  const target = new Date(iso).getTime();
  // Start from a stable value so SSR and first client render match.
  const [now, setNow] = useState(target - 30 * 86_400_000);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const p = parts(target, now);
  const units = [
    { v: p.days, l: "days" },
    { v: p.hours, l: "hrs" },
    { v: p.mins, l: "min" },
    { v: p.secs, l: "sec" },
  ];

  const box =
    tone === "dark"
      ? "border-white/15 bg-white/5 text-paper-soft"
      : "border-forest/10 bg-paper-soft text-forest";
  const lbl = tone === "dark" ? "text-paper-soft/55" : "text-muted";

  return (
    <div className="flex items-stretch gap-2" suppressHydrationWarning>
      {units.map((u) => (
        <div
          key={u.l}
          className={`flex min-w-[3.4rem] flex-col items-center rounded-xl border px-2.5 py-2 ${box}`}
        >
          <span className="font-display text-2xl font-semibold tabular-nums leading-none">
            {mounted ? String(u.v).padStart(2, "0") : "––"}
          </span>
          <span className={`mt-1 text-[0.6rem] font-medium uppercase tracking-wider ${lbl}`}>
            {u.l}
          </span>
        </div>
      ))}
    </div>
  );
}
