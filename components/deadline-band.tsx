import { CalendarClock } from "lucide-react";
import { Countdown } from "@/components/countdown";
import { deadlines } from "@/lib/site";

export function DeadlineBand() {
  const rows = [
    {
      d: deadlines.smb,
      note: "Coffee, cocoa, rubber & most small food/goods businesses",
      accent: true,
    },
    {
      d: deadlines.large,
      note: "Larger firms — and micro/small timber already under the old EUTR",
      accent: false,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-forest-deep text-paper-soft">
      <div className="grid-dots absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-signal/15 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="mb-8 flex items-center gap-2.5">
          <CalendarClock className="h-5 w-5 text-signal-soft" />
          <p className="eyebrow text-signal-soft">The clock is running</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {rows.map(({ d, note, accent }) => (
            <div
              key={d.dateDisplay}
              className={`rounded-3xl border p-6 sm:p-7 ${
                accent
                  ? "border-signal/30 bg-signal/10"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <p className="text-sm font-medium text-paper-soft/70">{d.label}</p>
              <p className="mt-1 font-display text-2xl font-semibold text-paper-soft sm:text-3xl">
                {d.dateDisplay}
              </p>
              <div className="mt-5">
                <Countdown iso={d.date} tone="dark" />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-paper-soft/60">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
