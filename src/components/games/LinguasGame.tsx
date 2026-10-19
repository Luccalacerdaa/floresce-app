"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { speak, useMicLevel } from "@/lib/sound";

const WORDS = [
  { pt: "Água", en: "Water", es: "Agua", emoji: "💧" },
  { pt: "Sol", en: "Sun", es: "Sol", emoji: "☀️" },
  { pt: "Gato", en: "Cat", es: "Gato", emoji: "🐱" },
  { pt: "Casa", en: "House", es: "Casa", emoji: "🏠" },
  { pt: "Mãe", en: "Mom", es: "Mamá", emoji: "👩" },
  { pt: "Comida", en: "Food", es: "Comida", emoji: "🍎" },
  { pt: "Amigo", en: "Friend", es: "Amigo", emoji: "🤝" },
  { pt: "Feliz", en: "Happy", es: "Feliz", emoji: "😊" },
];

type Phase = "listen" | "try" | "done";

export function LinguasGame({
  celebrate,
  score,
  micLevel,
  micStatus,
}: {
  celebrate: () => void;
  score: () => void;
  micLevel: number;
  micStatus: string;
}) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("listen");
  const [lang, setLang] = useState<"en" | "es">("en");
  const triedRef = useRef(false);
  const word = WORDS[index % WORDS.length];

  useEffect(() => {
    setPhase("listen");
    triedRef.current = false;
    const t = setTimeout(() => {
      speak(word[lang], lang === "en" ? "en-US" : "es-ES");
      setTimeout(() => setPhase("try"), 1500);
    }, 500);
    return () => clearTimeout(t);
  }, [index, lang, word]);

  useEffect(() => {
    if (phase === "try" && micLevel > 0.07 && !triedRef.current) {
      triedRef.current = true;
      setPhase("done");
      celebrate();
    }
  }, [phase, micLevel, celebrate]);

  const manualTry = useCallback(() => {
    if (phase !== "try") return;
    triedRef.current = true;
    setPhase("done");
    celebrate();
  }, [phase, celebrate]);

  const nextWord = useCallback(() => {
    setLang((l) => (l === "en" ? "es" : "en"));
    setIndex((i) => i + 1);
  }, []);

  useEffect(() => {
    if (phase === "done") {
      const t = setTimeout(nextWord, 2500);
      return () => clearTimeout(t);
    }
  }, [phase, nextWord]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-4">
      <div className="text-7xl">{word.emoji}</div>

      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
          {lang === "en" ? "🇺🇸 Inglês" : "🇸 Espanhol"}
        </p>
        <h2 className="font-display text-3xl mt-1">
          {lang === "en" ? word.en : word.es}
        </h2>
        <p className="text-sm text-ink-soft mt-1">em português: {word.pt}</p>
      </div>

      {phase === "listen" && (
        <p className="text-sm text-ink-soft animate-pulse"> Ouvindo...</p>
      )}

      {phase === "try" && (
        <div className="flex flex-col items-center gap-3">
          <div className="h-3 w-40 overflow-hidden rounded-full bg-paper-2">
            <div
              className="h-full rounded-full bg-moss transition-all"
              style={{ width: `${Math.min(100, micLevel * 500)}%` }}
            />
          </div>
          <button
            onClick={manualTry}
            className="rounded-full bg-butter px-6 py-3 font-bold text-ink shadow active:scale-95"
          >
            🗣️ Tentou!
          </button>
        </div>
      )}

      {phase === "done" && (
        <p className="text-xl font-bold text-moss animate-bounce">🎉 Muito bem!</p>
      )}
    </div>
  );
}