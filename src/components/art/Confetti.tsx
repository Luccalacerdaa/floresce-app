"use client";

import { useMemo } from "react";

const PIECES = ["🌸", "🍃", "✨", "🌼", "💛", "🌱"];

// Gerador simples e determinístico a partir da seed.
function makePieces(seed: number, count: number) {
  let s = seed * 9301 + 49297;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, (_, i) => ({
      id: `${seed}-${i}`,
      left: rand() * 100,
      x: (rand() - 0.5) * 160,
      r: (rand() - 0.5) * 720,
      t: 1.6 + rand() * 1.6,
      delay: rand() * 0.4,
      size: 16 + rand() * 14,
      char: PIECES[Math.floor(rand() * PIECES.length)],
  }));
}

// Chuva de pétalas. Troque a `seed` para disparar de novo.
export function Confetti({ seed, count = 28 }: { seed: number; count?: number }) {
  const pieces = useMemo(() => makePieces(seed, count), [seed, count]);

  if (!seed) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              fontSize: p.size,
              animationDelay: `${p.delay}s`,
              "--x": `${p.x}px`,
              "--r": `${p.r}deg`,
              "--t": `${p.t}s`,
            } as React.CSSProperties
          }
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}
