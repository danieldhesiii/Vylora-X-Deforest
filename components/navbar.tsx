"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, CalendarClock } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Logo } from "@/components/decor";
import { site, navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass border-b border-forest/10 py-2.5 shadow-soft" : "py-4"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <Logo className="h-9 w-9" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold tracking-tight text-forest">
              {site.name}
            </span>
            <span className="eyebrow text-[0.5rem] text-moss/80">EUDR made manageable</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-forest/70 transition-colors hover:text-forest"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.demoUrl}
            className="inline-flex items-center gap-2 rounded-full border border-forest/20 px-4 py-2 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
          >
            <CalendarClock className="h-4 w-4" />
            Book a demo
          </a>
          {isLoaded && !isSignedIn && (
            <>
              <a
                href="/sign-in"
                className="text-sm font-medium text-forest/70 transition-colors hover:text-forest"
              >
                Sign in
              </a>
              <a
                href="/sign-up"
                className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-signal-bright"
              >
                Get started
              </a>
            </>
          )}
          {isLoaded && isSignedIn && (
            <>
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-signal-bright"
              >
                Dashboard
              </a>
              <UserButton />
            </>
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-forest lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="glass mx-4 mt-3 overflow-hidden rounded-3xl border border-forest/10 p-4 lg:hidden"
          >
            <div className="flex flex-col">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3.5 text-lg font-medium text-forest transition-colors hover:bg-forest/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={site.demoUrl}
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-forest/20 px-5 py-4 text-base font-semibold text-forest"
              >
                <CalendarClock className="h-5 w-5" />
                Book a demo
              </a>
              {isLoaded && !isSignedIn && (
                <>
                  <a
                    href="/sign-in"
                    onClick={() => setOpen(false)}
                    className="mt-2 rounded-2xl px-4 py-3.5 text-center text-lg font-medium text-forest transition-colors hover:bg-forest/5"
                  >
                    Sign in
                  </a>
                  <a
                    href="/sign-up"
                    onClick={() => setOpen(false)}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-signal px-5 py-4 text-base font-semibold text-white"
                  >
                    Get started
                  </a>
                </>
              )}
              {isLoaded && isSignedIn && (
                <a
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-signal px-5 py-4 text-base font-semibold text-white"
                >
                  Go to dashboard
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
