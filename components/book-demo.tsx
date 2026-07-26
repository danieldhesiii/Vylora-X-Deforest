"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, CalendarClock } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { bookDemo, site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

export function BookDemo() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const res = await fetch(site.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="book-demo" className="relative bg-paper-deep/40 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="eyebrow text-moss">{bookDemo.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-forest sm:text-4xl lg:text-[2.75rem]">
            {bookDemo.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {bookDemo.body}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="rounded-4xl border border-forest/10 bg-paper-soft p-6 shadow-soft sm:p-9">
            {status === "success" ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-signal/10 text-signal">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-forest">
                  {bookDemo.success.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                  {bookDemo.success.body}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* honeypot spam trap */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <input
                  type="hidden"
                  name="_subject"
                  value="New Deforest demo request"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name" htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className={inputCls}
                      placeholder="Jane Roaster"
                    />
                  </Field>
                  <Field label="Work email" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputCls}
                      placeholder="jane@yourcompany.com"
                    />
                  </Field>
                </div>

                <Field label="Company" htmlFor="company">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    autoComplete="organization"
                    className={inputCls}
                    placeholder="Your company"
                  />
                </Field>

                <Field label="Which best describes you?" htmlFor="role">
                  <select id="role" name="role" required defaultValue="" className={inputCls}>
                    <option value="" disabled>
                      Select one…
                    </option>
                    {bookDemo.roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Anything specific you'd like to see? (optional)" htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className={`${inputCls} resize-none`}
                    placeholder="e.g. we import green coffee from Colombia and Ethiopia…"
                  />
                </Field>

                {status === "error" && (
                  <p className="rounded-2xl border border-flag/25 bg-flag/5 px-4 py-3 text-sm text-flag">
                    {bookDemo.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-signal px-7 py-4 text-base font-semibold text-white shadow-soft transition-colors hover:bg-signal-bright disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <CalendarClock className="h-5 w-5" />
                      {bookDemo.submitLabel}
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-relaxed text-faint">
                  We&apos;ll only use your details to arrange your demo. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-2xl border border-forest/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-signal focus:ring-2 focus:ring-signal/15";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-sm font-medium text-forest">{label}</span>
      {children}
    </label>
  );
}
