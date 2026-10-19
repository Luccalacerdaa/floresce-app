"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { speak } from "@/lib/sound";

const COUNTRIES = [
  { flag: "🇧🇷", name: "Brasil", word: "Olá", lang: "Português" },
  { flag: "🇺🇸", name: "Estados Unidos", word: "Hello", lang: "Inglês" },
  { flag: "🇪🇸", name: "Espanha", word: "Hola", lang: "Espanhol" },
  { flag: "🇫", name: "França", word: "Bonjour", lang: "Francês" },
  { flag: "🇮🇹", name: "Itália", word: "Ciao", lang: "Italiano" },
  { flag: "🇯🇵", name: "Japão", word: "Konnichiwa", lang: "Japonês" },
  { flag: "🇩🇪", name: "Alemanha", word: "Hallo", lang: "Alemão" },
  { flag: "🇨🇳", name: "China", word: "Nǐ hǎo", lang: "Chinês" },
  { flag: "🇰🇷", name: "Coreia", word: "Annyeong", lang: "Coreano" },
  { flag: "🇷🇺", name: "Rússia", word: "Privet", lang: "Russo" },
  { flag: "🇦", name: "Argentina", word: "Che", lang: "Espanhol" },
  { flag: "🇲🇽", name: "México", word: "Órale", lang: "Espanhol" },
];

export function PaisesGame({ celebrate, score }: { celebrate: () => void; score: () => void }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const country = COUNTRIES[index % COUNTRIES.length];

  const reveal = useCallback(() => {
    if (revealed) return;
    setRevealed(true);
    speak(`${country.name}. ${country.word}`);
    celebrate();
  }, [revealed, country, celebrate]);

  const next = useCallback(() => {
    setIndex((i) => i + 1);
    setRevealed(false);
  }, []);

  useEffect(() => {
    if (revealed) {
      const t = setTimeout(next, 3500);
      return () => clearTimeout(t);
    }
  }, [revealed, next]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
      <button
        onClick={reveal}
        className={`grid size-40 place-items-center rounded-[40px] text-8xl shadow-lg transition-all duration-500 active:scale-95 ${
          revealed ? "bg-sky-soft scale-110" : "bg-paper-2 animate-pulse"
        }`}
      >
        {revealed ? country.flag : "🌍"}
      </button>

      {revealed ? (
        <div className="text-center animate-fade-in">
          <p className="text-sm font-bold uppercase tracking-wider text-ink-soft">{country.lang}</p>
          <h2 className="font-display text-3xl mt-1">{country.name}</h2>
          <p className="mt-3 text-2xl font-bold text-moss">&ldquo;{country.word}&rdquo;</p>
        </div>
      ) : (
        <p className="text-lg text-ink-soft">Toque no globo para viajar!</p>
      )}

      <div className="flex gap-1.5">
        {COUNTRIES.slice(0, 8).map((_, i) => (
          <div
            key={i}
            className={`size-2 rounded-full ${i === index % 8 ? "bg-moss" : "bg-paper-2"}`}
          />
        ))}
      </div>
    </div>
  );
}