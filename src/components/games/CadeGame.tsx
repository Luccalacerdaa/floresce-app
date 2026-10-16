"use client";

import { useEffect, useState } from "react";
import { chime, speak } from "@/lib/sound";

const ANIMALS = [
  { e: "🐶", n: "o cachorro", s: "Au au!" },
  { e: "🐱", n: "o gato", s: "Miau!" },
  { e: "🐮", n: "a vaca", s: "Muuu!" },
  { e: "🐸", n: "o sapo", s: "Croac!" },
  { e: "🦆", n: "o pato", s: "Quá quá!" },
  { e: "🐷", n: "o porquinho", s: "Oinc oinc!" },
];

// Cadê o Bicho? Um bicho se esconde atrás de uma das moitas, que balança.
export function CadeGame({ celebrate, score }: { celebrate: () => void; score: () => void }) {
  const [round, setRound] = useState(0);
  const [spot, setSpot] = useState(1);
  const [found, setFound] = useState(false);
  const [miss, setMiss] = useState<number | null>(null);
  const animal = ANIMALS[round % ANIMALS.length];

  useEffect(() => {
    const t = setTimeout(() => speak(`Cadê ${animal.n}?`), 500);
    return () => clearTimeout(t);
  }, [animal]);

  function pick(i: number) {
    if (found) return;
    if (i !== spot) {
      setMiss(i);
      speak("Aqui não… cadê?");
      setTimeout(() => setMiss(null), 600);
      return;
    }
    setFound(true);
    chime(true);
    celebrate();
    score();
    speak(`Achou! ${animal.n.split(" ")[1]}! ${animal.s}`);
    setTimeout(() => {
      setFound(false);
      setSpot((p) => (p + 1 + Math.floor(Math.random() * 2)) % 3);
      setRound((r) => r + 1);
    }, 2600);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-between px-4 pt-2">
      <button
        onClick={() => speak(`Cadê ${animal.n}?`)}
        className="rounded-full bg-card px-5 py-3 font-display text-2xl shadow-md active:scale-95"
      >
        🔊 Cadê {animal.n}?
      </button>

      <div className="relative w-full flex-1">
        <svg viewBox="0 0 300 120" className="absolute inset-x-0 top-4 w-full" aria-hidden>
          <circle cx="250" cy="40" r="22" fill="#f6c443" />
          <circle cx="250" cy="40" r="32" fill="#f6c443" opacity=".2" />
          <g fill="#fff" opacity=".9" className="animate-float">
            <ellipse cx="60" cy="40" rx="30" ry="11" />
            <ellipse cx="82" cy="32" rx="20" ry="13" />
            <ellipse cx="160" cy="80" rx="22" ry="8" />
          </g>
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-[42%] rounded-t-[50%] bg-[#9dbb84]" />
        <div className="absolute inset-x-0 bottom-0 h-[22%] rounded-t-[40%] bg-[#86a96f]" />
        <div className="absolute -inset-x-2 bottom-4 grid grid-cols-3 items-end">
          {[0, 1, 2].map((i) => {
            const here = i === spot;
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                aria-label={`Moita ${i + 1}`}
                className="relative flex h-60 flex-col items-center justify-end"
              >
                <span
                  className={`absolute bottom-20 text-7xl transition-all duration-500 ${
                    here && found ? "-translate-y-20 scale-125 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                >
                  {animal.e}
                </span>
                <Bush wiggle={here && !found} shake={miss === i} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Bush({ wiggle, shake }: { wiggle: boolean; shake: boolean }) {
  return (
    <svg
      viewBox="0 0 120 90"
      className={`relative w-[125%] max-w-none origin-bottom ${wiggle ? "animate-wiggle" : ""} ${shake ? "animate-[wiggle_0.15s_linear_3]" : ""}`}
      style={wiggle ? { animationDuration: "1.4s" } : undefined}
      aria-hidden
    >
      <circle cx="30" cy="58" r="28" fill="#5f8f5a" />
      <circle cx="90" cy="58" r="28" fill="#5f8f5a" />
      <circle cx="60" cy="40" r="34" fill="#6f9d63" />
      <circle cx="48" cy="34" r="6" fill="#8fb37f" />
      <circle cx="78" cy="50" r="5" fill="#8fb37f" />
      <circle cx="40" cy="62" r="3" fill="#f2a7a0" />
      <circle cx="84" cy="34" r="3" fill="#f6c443" />
      <rect x="10" y="78" width="100" height="12" rx="6" fill="#4e7a4a" />
    </svg>
  );
}
