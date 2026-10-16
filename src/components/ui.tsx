import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-[1.05rem] font-semibold transition active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-clay disabled:opacity-40";

export const buttonStyles = {
  primary: `${base} bg-clay text-white shadow-[0_10px_24px_-10px_var(--color-clay)] hover:bg-clay-deep`,
  dark: `${base} bg-ink text-paper hover:bg-ink/90`,
  ghost: `${base} border border-line bg-card text-ink hover:border-ink/40`,
};

export function CtaLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof buttonStyles }) {
  return <Link {...props} className={`${buttonStyles[variant]} ${className}`} />;
}

export function Arrow() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
      <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss">{children}</p>
  );
}
