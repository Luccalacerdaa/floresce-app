"use client";

import { useEffect, useState } from "react";
import { chime, speak } from "@/lib/sound";

const PAIRS: [string, string][][] = [
  [
    ["🍌", "banana"],
    ["🍪", "biscoito"],
  ],
  [
    ["🚗", "carro"],
    ["⚽", "bola"],
  ],
  [
    ["🐶", "cachorro"],
    ["🐱", "gato"],
  ],
  [
    ["🍎", "maçã"],
    ["🥛", "leite"],
  ],
  [
    ["🧸", "urso"],
    ["🫧", "bolha"],
  ],
  [
    ["🛁", "banho"],
    ["🎵", "música"],
  ],
];

// Este ou Aquele? A criança escolhe e o app repete o nome.
export function EscolhaGame({ celebrate, score }: { celebrate: () => void; score: () => void }) {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const pair = PAIRS[round % PAIRS.length];

  useEffect(() => {
    const t = setTimeout(() => speak(`${pair[0][1]}… ou ${pair[1][1]}?`, { rate: 0.75 }), 500);
    return () => clearTimeout(t);
  }, [pair]);

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    chime();
    celebrate();
    score();
    const word = pair[i][1];
    speak(`${word}! Você quer ${word}! ${word}!`, { rate: 0.8 });
    setTimeout(() => {
      setPicked(null);
      setRound((r) => r + 1);
    }, 3000);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-5">
      <p className="font-display text-2xl">Este ou aquele?</p>
      <div className="grid w-full grid-cols-2 gap-4">
        {pair.map(([emoji, word], i) => (
          <div key={word} className="flex flex-col items-center gap-2">
            <button
              onClick={() => pick(i)}
              className={`grid aspect-square w-full place-items-center rounded-[32px] bg-card text-8xl shadow-[0_10px_0_-2px_rgb(30_51_41/0.18)] transition-all duration-500 active:scale-95 ${
                picked === i ? "z-10 scale-110 ring-8 ring-butter" : picked !== null ? "scale-90 opacity-30" : ""
              }`}
            >
              <span className={picked === i ? "animate-wiggle" : ""}>{emoji}</span>
            </button>
            <button
              onClick={() => speak(word, { rate: 0.75 })}
              className="rounded-full bg-card/80 px-4 py-1.5 text-sm font-semibold"
            >
              🔊 {word}
            </button>
          </div>
        ))}
      </div>
      <p className="max-w-xs text-center text-sm text-ink-soft">
        Diga os dois nomes e espere: olhar, apontar ou estender a mão já é escolher.
      </p>
    </div>
  );
}
