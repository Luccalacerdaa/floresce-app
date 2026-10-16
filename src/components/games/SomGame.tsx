"use client";

import { useEffect, useRef, useState } from "react";
import { chime, speak } from "@/lib/sound";

const ANIMALS = [
  { e: "🐮", s: "Muuu", n: "vaca" },
  { e: "🐶", s: "Au au", n: "cachorro" },
  { e: "🐱", s: "Miau", n: "gato" },
  { e: "🐑", s: "Méééé", n: "ovelha" },
  { e: "🐍", s: "Ssssss", n: "cobra" },
  { e: "🚗", s: "Bi bi", n: "carro" },
];

const THRESHOLD = 0.07;

// Faz o Som! O bicho faz o som e espera. Qualquer tentativa de imitar faz ele dançar.
export function SomGame({
  level,
  micOn,
  celebrate,
  score,
}: {
  level: number;
  micOn: boolean;
  celebrate: () => void;
  score: () => void;
}) {
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<"listen" | "wait" | "yay">("listen");
  const loudSince = useRef<number | null>(null);
  const deafUntil = useRef(0);
  const animal = ANIMALS[round % ANIMALS.length];

  function model() {
    // Durante a fala do app, o microfone é ignorado (para não contar a própria voz do app).
    deafUntil.current = Date.now() + 1600;
    speak(`${animal.s}!`, { rate: 0.75 });
    setPhase("wait");
  }

  function success() {
    setPhase("yay");
    chime(true);
    celebrate();
    score();
    setTimeout(() => speak(`Isso! ${animal.s}!`), 300);
    setTimeout(() => {
      setRound((r) => r + 1);
      setPhase("listen");
    }, 2800);
  }

  useEffect(() => {
    const t = setTimeout(model, 700);
    return () => clearTimeout(t);
    // Uma vez por bicho.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  useEffect(() => {
    if (phase !== "wait" || !micOn || Date.now() < deafUntil.current) return;
    if (level > THRESHOLD) {
      loudSince.current ??= Date.now();
      if (Date.now() - loudSince.current > 180) {
        loudSince.current = null;
        success();
      }
    } else {
      loudSince.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, phase, micOn]);

  const ring = Math.min(1, level / 0.2);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="relative grid size-64 place-items-center">
        {phase === "wait" && micOn && (
          <div
            className="absolute inset-0 rounded-full bg-card/70 transition-transform duration-75"
            style={{ transform: `scale(${0.75 + ring * 0.35})` }}
          />
        )}
        <span className={`relative text-[9rem] leading-none ${phase === "yay" ? "animate-wiggle" : "animate-float"}`}>
          {animal.e}
        </span>
      </div>

      <p className="font-display text-3xl">
        {phase === "yay" ? `Isso! ${animal.s}! 🎉` : phase === "wait" ? "Sua vez! 👂" : `${animal.s}…`}
      </p>
      <p className="max-w-xs text-sm text-ink-soft">
        {phase === "wait"
          ? micOn
            ? "Faça o som junto e depois espere em silêncio. Qualquer tentativa vale!"
            : "Faça o som junto e espere. Tentou? Toque no botão abaixo."
          : "Escute o bicho…"}
      </p>

      <div className="flex w-full max-w-xs gap-3">
        <button onClick={model} className="flex-1 rounded-full bg-card py-3 font-semibold shadow-sm active:scale-95">
          🔊 De novo
        </button>
        <button
          onClick={success}
          disabled={phase !== "wait"}
          className="flex-1 rounded-full bg-ink py-3 font-semibold text-paper shadow-sm active:scale-95 disabled:opacity-40"
        >
          Tentou! 🎉
        </button>
      </div>
    </div>
  );
}
