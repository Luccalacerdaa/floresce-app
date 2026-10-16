import Link from "next/link";
import { BRAND } from "@/lib/config";

export function SproutIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <path d="M16 29V15" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M16 17c0-6 4-9.5 10-9.5 0 6-4 9.5-10 9.5Z" fill="var(--color-moss)" />
      <path d="M16 20c0-4.6-3.2-7.4-8-7.4 0 4.6 3.2 7.4 8 7.4Z" fill="var(--color-sage)" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-1.5 text-ink" aria-label={BRAND.name}>
      <SproutIcon className="size-7" />
      <span className="font-display text-[1.45rem] font-semibold tracking-tight">{BRAND.name.toLowerCase()}</span>
    </Link>
  );
}
