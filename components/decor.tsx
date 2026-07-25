import { cn } from "@/lib/utils";

/** The Deforest mark: a leaf inside a satellite/scan ring — nature meets
 *  the orbital forest check. Used in the navbar and footer. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={cn("text-forest", className)} aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <circle cx="20" cy="20" r="13.5" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      {/* leaf */}
      <path
        d="M20 29c-5-1.6-8-5.4-8-10.4C12 13.5 15.4 10 20 8c4.6 2 8 5.5 8 10.6 0 5-3 8.8-8 10.4Z"
        fill="currentColor"
        opacity="0.14"
      />
      <path
        d="M20 30V13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20 18c-2.4-.4-4.2-1.8-5-3.8 2 .2 3.8 1 5 2.4M20 22c2.4-.4 4.2-1.8 5-3.8-2 .2-3.8 1-5 2.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* scan tick */}
      <circle cx="20" cy="20" r="1.6" className="fill-signal" />
    </svg>
  );
}

/** A soft leaf sprig used as a recurring background motif. */
export function LeafSprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 160" fill="none" className={cn("text-sage", className)} aria-hidden="true">
      <path d="M50 158V44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {[...Array(6)].map((_, i) => {
        const y = 44 + i * 18;
        return (
          <g key={i}>
            <path d={`M50 ${y} C30 ${y - 6} 18 ${y - 18} 14 ${y - 30} C34 ${y - 24} 46 ${y - 12} 50 ${y}`} fill="currentColor" opacity={0.8 - i * 0.06} />
            <path d={`M50 ${y} C70 ${y - 6} 82 ${y - 18} 86 ${y - 30} C66 ${y - 24} 54 ${y - 12} 50 ${y}`} fill="currentColor" opacity={0.8 - i * 0.06} />
          </g>
        );
      })}
      <path d="M50 44 C44 26 50 10 50 6 C50 10 56 26 50 44Z" fill="currentColor" />
    </svg>
  );
}

/** A thin divider with a centred dot — separates sections quietly. */
export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-sage/50" />
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-sage/50" />
    </div>
  );
}
