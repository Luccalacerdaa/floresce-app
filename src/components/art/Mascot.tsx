// Brotinho: o mascote do Floresce. Uma sementinha com um broto na cabeça.

export type Mood = "happy" | "wow" | "think" | "love";

export function Mascot({ mood = "happy", className = "" }: { mood?: Mood; className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden>
      <ellipse cx="60" cy="134" rx="30" ry="5" fill="rgb(30 51 41 / 0.12)" />
      <g style={{ transformOrigin: "60px 48px" }} className="animate-sway">
        <path d="M60 52V36" stroke="#4e7a4a" strokeWidth="5" strokeLinecap="round" />
        <path d="M60 40C60 20 73 8 95 6c0 21-13 33-35 34Z" fill="#5f8f5a" />
        <path d="M60 44C60 28 49 18 29 16c0 17 11 27 31 28Z" fill="#8fb37f" />
        <path d="M66 32c6-6 13-11 21-14" stroke="#4e7a4a" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".5" />
      </g>
      <path d="M60 50c26 0 42 22 42 46 0 22-18 34-42 34S18 118 18 96c0-24 16-46 42-46Z" fill="#f5cf6b" />
      <path d="M60 78c16 0 26 12 26 24 0 13-11 22-26 22s-26-9-26-22c0-12 10-24 26-24Z" fill="#fbe3a4" />
      <ellipse cx="46" cy="132" rx="9" ry="5" fill="#e3b24a" />
      <ellipse cx="74" cy="132" rx="9" ry="5" fill="#e3b24a" />
      <circle cx="37" cy="98" r="7" fill="#f2a7a0" opacity=".6" />
      <circle cx="83" cy="98" r="7" fill="#f2a7a0" opacity=".6" />
      {mood === "think" ? (
        <>
          <path d="M41 86h10" stroke="#1e3329" strokeWidth="4" strokeLinecap="round" />
          <circle cx="74" cy="86" r="5" fill="#1e3329" />
        </>
      ) : mood === "love" ? (
        <>
          <path d="M40 84c2-4 7-4 7 0 0-4 5-4 7 0-1 4-7 7-7 7s-6-3-7-7Z" fill="#c4473a" />
          <path d="M66 84c2-4 7-4 7 0 0-4 5-4 7 0-1 4-7 7-7 7s-6-3-7-7Z" fill="#c4473a" />
        </>
      ) : (
        <>
          <circle cx="46" cy="86" r="5" fill="#1e3329" />
          <circle cx="74" cy="86" r="5" fill="#1e3329" />
          <circle cx="47.5" cy="84.5" r="1.6" fill="#fff" />
          <circle cx="75.5" cy="84.5" r="1.6" fill="#fff" />
        </>
      )}
      {mood === "wow" ? (
        <ellipse cx="60" cy="104" rx="6" ry="7" fill="#1e3329" />
      ) : mood === "think" ? (
        <path d="M53 104h12" stroke="#1e3329" strokeWidth="3.5" strokeLinecap="round" />
      ) : (
        <path d="M50 100q10 11 20 0" stroke="#1e3329" strokeWidth="3.5" strokeLinecap="round" fill="#c4473a" />
      )}
    </svg>
  );
}

export function SpeechBubble({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-[18px] bg-card px-4 py-2.5 text-sm font-semibold leading-snug shadow-[0_6px_20px_-12px_rgb(30_51_41/0.5)] before:absolute before:-left-1.5 before:top-1/2 before:size-3 before:-translate-y-1/2 before:rotate-45 before:bg-card ${className}`}
    >
      {children}
    </div>
  );
}
