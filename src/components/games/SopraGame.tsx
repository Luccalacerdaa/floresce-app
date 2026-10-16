"use client";

import { useEffect, useRef, useState } from "react";
import { chime, speak } from "@/lib/sound";

const SEEDS = 22;
const THRESHOLD = 0.1;

type Seed = { id: number; angle: number; gone: boolean; dx: number; dy: number; rot: number };

function freshSeeds(round: number): Seed[] {
  return Array.from({ length: SEEDS }, (_, i) => ({
    id: round * 100 + i,
    angle: (i / SEEDS) * 360,
    gone: false,
    dx: 120 + Math.random() * 220,
    dy: -(80 + Math.random() * 260),
    rot: Math.random() * 360,
  }));
}

// Sopra-Sopra: soprar o dente-de-leão, revezando a vez.
export function SopraGame({
  level,
  micOn,
  name,
  celebrate,
  score,
}: {
  level: number;
  micOn: boolean;
  name: string;
  celebrate: () => void;
  score: () => void;
}) {
  const [round, setRound] = useState(0);
  const [seeds, setSeeds] = useState(() => freshSeeds(0));
  const [holding, setHolding] = useState(false);
  const doneRef = useRef(false);
  const adultTurn = round % 2 === 0;
  const blowing = holding || (micOn && level > THRESHOLD);

  useEffect(() => {
    const t = setTimeout(() => speak(adultTurn ? "Primeiro eu! Fuuuu!" : `Agora é a vez de ${name}!`), 400);
    return () => clearTimeout(t);
  }, [adultTurn, name]);

  // Enquanto alguém sopra, algumas sementes se soltam a cada instante.
  useEffect(() => {
    if (!blowing) return;
    const t = setInterval(() => {
      setSeeds((prev) => {
        const left = prev.filter((s) => !s.gone);
        if (!left.length) return prev;
        const take = new Set(left.sort(() => Math.random() - 0.5).slice(0, 2).map((s) => s.id));
        return prev.map((s) => (take.has(s.id) ? { ...s, gone: true } : s));
      });
    }, 110);
    return () => clearInterval(t);
  }, [blowing]);

  useEffect(() => {
    if (doneRef.current || seeds.some((s) => !s.gone)) return;
    doneRef.current = true;
    chime(true);
    celebrate();
    score();
    const t = setTimeout(() => {
      doneRef.current = false;
      setRound((r) => r + 1);
      setSeeds(freshSeeds(round + 1));
    }, 1800);
    return () => clearTimeout(t);
  }, [seeds, round, celebrate, score]);

  return (
    <div className="flex flex-1 flex-col items-center justify-between px-6 text-center">
      <div className={`rounded-full px-5 py-2 font-display text-xl shadow-sm ${adultTurn ? "bg-card" : "bg-butter"}`}>
        {adultTurn ? "🙋 Vez do adulto" : `⭐ Vez de ${name}`}
      </div>

      <div className="relative h-[340px] w-full max-w-xs">
        <svg viewBox="0 0 200 320" className="absolute inset-0 size-full overflow-visible" aria-hidden>
          <path d="M100 320C100 250 96 200 100 150" stroke="#6f9d63" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M100 270c-18-6-30-20-34-36 18 4 30 18 34 36Z" fill="#8fb37f" />
          <circle cx="100" cy="140" r="9" fill="#c9b98f" />
          {seeds.map((s) => {
            const rad = (s.angle * Math.PI) / 180;
            const x = 100 + Math.cos(rad) * 48;
            const y = 140 + Math.sin(rad) * 48;
            return (
              <g
                key={s.id}
                style={{
                  transform: s.gone ? `translate(${s.dx}px, ${s.dy}px) rotate(${s.rot}deg)` : "none",
                  opacity: s.gone ? 0 : 1,
                  transition: "transform 1.6s cubic-bezier(.2,.6,.3,1), opacity 1.6s ease-in",
                  transformBox: "fill-box",
                }}
              >
                <line x1="100" y1="140" x2={x} y2={y} stroke="#e8e2d0" strokeWidth="1.5" />
                <circle cx={x} cy={y} r="7" fill="#fffdf6" stroke="#e8e2d0" />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="w-full max-w-xs pb-2">
        <p className="mb-3 text-sm text-ink-soft">
          {micOn ? "Soprem no microfone! Um de cada vez." : "Sem microfone: toque e segure para soprar."}
        </p>
        <button
          onPointerDown={() => setHolding(true)}
          onPointerUp={() => setHolding(false)}
          onPointerLeave={() => setHolding(false)}
          className={`w-full rounded-full py-4 font-display text-xl shadow-md transition select-none ${
            blowing ? "scale-95 bg-ink text-paper" : "bg-card"
          }`}
        >
          🌬️ {blowing ? "Fuuuuu…" : "Segure para soprar"}
        </button>
      </div>
    </div>
  );
}
