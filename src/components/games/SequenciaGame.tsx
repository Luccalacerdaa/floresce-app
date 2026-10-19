"use client";
import { useCallback, useEffect, useState } from "react";
import { speak } from "@/lib/sound";

const SEQUENCES = [
  { items: ["🌅", "️", ""], answer: "🌙", options: ["🌙", "", "⭐"], label: "dia → noite" },
  { items: ["🥚", "🐣", ""], answer: "", options: ["🐔", "🐶", ""], label: "ovo → pintinho → galinha" },
  { items: ["🌱", "🌿", ""], answer: "", options: ["", "🌸", "🍂"], label: "semente → planta → árvore" },
  { items: ["🧊", "💧", "💨"], answer: "💨", options: ["💨", "🔥", "️"], label: "gelo → água → vapor" },
  { items: ["👶", "", ""], answer: "", options: ["🧑", "", "🍼"], label: "bebê → criança → adulto" },
  { items: ["🟢", "", "🔴"], answer: "🔴", options: ["🔴", "🔵", ""], label: "sinal: verde → amarelo → vermelho" },
  { items: ["🌧️", "🌈", "☀️"], answer: "☀️", options: ["☀️", "️", "️"], label: "chuva → arco-íris → sol" },
  { items: ["🍎", "🔪", "🥧"], answer: "🥧", options: ["🥧", "🍌", ""], label: "maçã → cortar → torta" },
];

export function SequenciaGame({ celebrate, score }: { celebrate: () => void; score: () => void }) {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const seq = SEQUENCES[index % SEQUENCES.length];

  useEffect(() => {
    setChosen(null);
    setFeedback(null);
    speak(seq.items.join(", "));
  }, [index, seq]);

  const pick = useCallback(
    (option: string) => {
      if (chosen) return;
      setChosen(option);
      if (option === seq.answer) {
        setFeedback("correct");
        celebrate();
        setTimeout(() => setIndex((i) => i + 1), 2000);
      } else {
        setFeedback("wrong");
        setTimeout(() => {
          setChosen(null);
          setFeedback(null);
        }, 1200);
      }
    },
    [chosen, seq, celebrate]
  );

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-4">
      <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">O que vem depois?</p>

      <div className="flex items-center gap-3">
        {seq.items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="grid size-16 place-items-center rounded-2xl bg-paper-2 text-4xl shadow-sm">
              {item}
            </span>
            {i < seq.items.length - 1 && <span className="text-2xl text-ink-soft">→</span>}
          </div>
        ))}
        <span className="text-2xl text-ink-soft">→</span>
        <span className="grid size-16 place-items-center rounded-2xl border-3 border-dashed border-moss text-3xl text-moss">
          ?
        </span>
      </div>

      <div className="flex gap-3 mt-2">
        {seq.options.map((opt) => (
          <button
            key={opt}
            onClick={() => pick(opt)}
            className={`grid size-16 place-items-center rounded-2xl text-4xl shadow-md transition-all active:scale-95 ${
              chosen === opt
                ? feedback === "correct"
                  ? "bg-moss text-white scale-110"
                  : "bg-clay-soft scale-95 opacity-50"
                : "bg-card hover:bg-butter/30"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {feedback === "correct" && (
        <p className="text-lg font-bold text-moss animate-bounce">🎉 Isso mesmo!</p>
      )}
      {feedback === "wrong" && (
        <p className="text-sm text-ink-soft">Tente de novo!</p>
      )}

      <p className="text-xs text-ink-soft">{seq.label}</p>
    </div>
  );
}