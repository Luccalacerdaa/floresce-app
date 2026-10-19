"use client";

import { useCallback, useEffect, useState } from "react";
import { speak } from "@/lib/sound";

const EMOTIONS = [
  { emoji: "😊", name: "Feliz", color: "bg-butter/60", tip: "Quando algo bom acontece!" },
  { emoji: "😢", name: "Triste", color: "bg-sky-soft", tip: "Quando sentimos falta de algo." },
  { emoji: "😠", name: "Bravo", color: "bg-clay-soft/80", tip: "Quando algo nos incomoda." },
  { emoji: "😨", name: "Com medo", color: "bg-lavender/40", tip: "Quando algo é desconhecido." },
  { emoji: "🤩", name: "Empolgado", color: "bg-pink/40", tip: "Quando mal podemos esperar!" },
  { emoji: "😴", name: "Cansado", color: "bg-sage-soft", tip: "Quando o corpo precisa descansar." },
  { emoji: "🤔", name: "Pensativo", color: "bg-butter/30", tip: "Quando estamos imaginando algo." },
  { emoji: "😲", name: "Surpreso", color: "bg-sky-soft/80", tip: "Quando algo inesperado acontece!" },
];

export function EmocoesGame({ celebrate, score }: { celebrate: () => void; score: () => void }) {
  const [index, setIndex] = useState(0);
  const [showName, setShowName] = useState(false);
  const emotion = EMOTIONS[index % EMOTIONS.length];

  useEffect(() => {
    setShowName(false);
    const t = setTimeout(() => {
      setShowName(true);
      speak(emotion.name);
    }, 800);
    return () => clearTimeout(t);
  }, [index, emotion]);

  const tapFace = useCallback(() => {
    if (!showName) {
      setShowName(true);
      speak(emotion.name);
      celebrate();
    } else {
      setIndex((i) => i + 1);
    }
  }, [showName, emotion, celebrate]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-4">
      <button
        onClick={tapFace}
        className={`grid size-36 place-items-center rounded-full text-7xl shadow-lg transition-all duration-500 active:scale-95 ${emotion.color} ${
          showName ? "scale-110" : "animate-pulse"
        }`}
      >
        {emotion.emoji}
      </button>

      {showName ? (
        <div className="text-center animate-fade-in">
          <h2 className="font-display text-2xl">{emotion.name}</h2>
          <p className="text-sm text-ink-soft mt-2 max-w-[240px]">{emotion.tip}</p>
          <button
            onClick={() => setIndex((i) => i + 1)}
            className="mt-4 rounded-full bg-moss px-5 py-2 text-sm font-bold text-white shadow active:scale-95"
          >
            Próxima emoção →
          </button>
        </div>
      ) : (
        <p className="text-sm text-ink-soft">Que emoção é essa? Toque para descobrir!</p>
      )}

      <p className="text-xs text-ink-soft">
        {emotion.emoji} Faça essa cara junto com a criança!
      </p>
    </div>
  );
}