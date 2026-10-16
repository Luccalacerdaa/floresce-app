"use client";

import { useEffect, useRef, useState } from "react";
import { chime, speak } from "@/lib/sound";

const NEXT = [
  { e: "🛁", n: "banho" },
  { e: "🍽️", n: "comer" },
  { e: "🚗", n: "sair" },
  { e: "😴", n: "dormir" },
  { e: "🪥", n: "escovar os dentes" },
];

const PETALS = 12;

// Hora de Trocar: uma flor que vai perdendo as pétalas avisa que a brincadeira está acabando.
export function TrocaTool({ score }: { score: () => void }) {
  const [next, setNext] = useState(NEXT[0]);
  const [total, setTotal] = useState(60);
  const [left, setLeft] = useState<number | null>(null);
  const warned = useRef(false);

  useEffect(() => {
    if (left === null || left <= 0) return;
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  useEffect(() => {
    if (left === null) return;
    if (left === 20 && !warned.current) {
      warned.current = true;
      speak("Mais um pouquinho e acabou!");
    }
    if (left === 0) {
      chime(true);
      score();
      speak(`Acabou! Tchau, brinquedo! Agora é hora de ${next.n}!`);
    }
  }, [left, next, score]);

  const running = left !== null && left > 0;
  const petals = left === null ? PETALS : Math.ceil((left / total) * PETALS);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 text-center">
      <div className="relative size-64">
        <svg viewBox="0 0 200 200" className="size-full" aria-hidden>
          {Array.from({ length: PETALS }, (_, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="52"
              rx="17"
              ry="40"
              fill="#f2a7a0"
              transform={`rotate(${i * (360 / PETALS)} 100 100)`}
              style={{ opacity: i < petals ? 1 : 0, transition: "opacity .8s" }}
            />
          ))}
          <circle cx="100" cy="100" r="34" fill="#f6c443" />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-5xl">
          {left === 0 ? next.e : running ? `${left}` : "🧸"}
        </span>
      </div>

      {left === 0 ? (
        <>
          <p className="font-display text-3xl">Hora de {next.n}! {next.e}</p>
          <button onClick={() => { setLeft(null); warned.current = false; }} className="rounded-full bg-card px-6 py-3 font-semibold">
            Usar de novo
          </button>
        </>
      ) : running ? (
        <p className="font-display text-2xl">As pétalas estão caindo… 🌸</p>
      ) : (
        <>
          <p className="font-display text-2xl">O que vem depois?</p>
          <div className="flex flex-wrap justify-center gap-2">
            {NEXT.map((n) => (
              <button
                key={n.n}
                onClick={() => setNext(n)}
                className={`grid size-14 place-items-center rounded-2xl text-3xl ${next.n === n.n ? "bg-card ring-4 ring-moss" : "bg-card/60"}`}
                aria-label={n.n}
              >
                {n.e}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {[30, 60, 120].map((sec) => (
              <button
                key={sec}
                onClick={() => setTotal(sec)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${total === sec ? "bg-ink text-paper" : "bg-card"}`}
              >
                {sec < 60 ? `${sec} s` : `${sec / 60} min`}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              speak(`Vamos brincar mais um pouquinho, e depois é hora de ${next.n}.`);
              setLeft(total);
            }}
            className="w-full max-w-xs rounded-full bg-ink py-4 font-display text-xl text-paper"
          >
            Começar contagem
          </button>
        </>
      )}
    </div>
  );
}
