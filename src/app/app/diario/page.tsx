"use client";

import { useState } from "react";
import { actions, type DiaryEntry, useApp } from "@/lib/appState";
import { Mascot } from "@/components/art/Mascot";
import { Confetti } from "@/components/art/Confetti";

const MOODS: DiaryEntry["mood"][] = ["😊", "😐", "😢", "🤩", "😴"];
const TAGS = [
  "Comunicação",
  "Brincadeira",
  "Rotina",
  "Social",
  "Sensorial",
  "Escola",
  "Terapia",
  "Família",
];

export default function DiarioPage() {
  const s = useApp();
  const [text, setText] = useState("");
  const [mood, setMood] = useState<DiaryEntry["mood"]>("😊");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [party, setParty] = useState(0);

  const canSave = text.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    actions.addDiaryEntry({
      date: new Date().toISOString(),
      text: text.trim(),
      mood,
      tags: selectedTags,
    });
    setText("");
    setMood("😊");
    setSelectedTags([]);
    setParty((p) => p + 1);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-5 px-4 pb-24 pt-4">
      <Confetti seed={party} />
      <header>
        <h1 className="font-display text-2xl font-medium">Diário de Bordo</h1>
        <p className="text-sm text-ink-soft">
          Registre observações rápidas. Cada registro vale +15 🌱
        </p>
      </header>

      {/* Formulário */}
      <div className="rounded-[28px] bg-card p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Mascot mood="happy" className="size-12 shrink-0" />
          <p className="text-sm leading-snug">
            Como foi o dia de <b>{s.childName}</b>? O que você observou?
          </p>
        </div>

        {/* Humor */}
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">
            Humor geral
          </p>
          <div className="flex gap-2">
            {MOODS.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`grid size-12 place-items-center rounded-full text-2xl transition active:scale-90 ${
                  mood === m
                    ? "bg-butter shadow-md scale-110"
                    : "bg-paper-2 opacity-60"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Texto */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ex.: Hoje ele apontou para o avião e olhou para mim!"
          className="w-full resize-none rounded-2xl border-2 border-line bg-paper p-4 text-sm leading-relaxed outline-none focus:border-moss min-h-[100px]"
          maxLength={500}
        />
        <p className="mt-1 text-right text-[10px] text-ink-soft">
          {text.length}/500
        </p>

        {/* Tags */}
        <div className="mt-3">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">
            Etiquetas (opcional)
          </p>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full border-2 px-3 py-1 text-xs font-semibold transition active:scale-95 ${
                  selectedTags.includes(tag)
                    ? "border-moss bg-sage-soft text-ink"
                    : "border-line bg-paper text-ink-soft"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Botão salvar */}
        <button
          onClick={save}
          disabled={!canSave}
          className={`mt-5 w-full rounded-full py-3.5 font-bold text-white shadow-lg transition active:translate-y-0.5 active:shadow-none ${
            canSave
              ? "bg-moss"
              : "bg-paper-2 text-ink-soft cursor-not-allowed shadow-none"
          }`}
        >
          Salvar registro ✨
        </button>
      </div>

      {/* Histórico */}
      {s.diary.length > 0 && (
        <section>
          <h2 className="font-display text-lg mb-3">Registros recentes</h2>
          <div className="space-y-3">
            {s.diary.slice(0, 10).map((entry) => (
              <div
                key={entry.id}
                className="rounded-[20px] bg-card p-4 shadow-sm"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl">{entry.mood}</span>
                  <span className="text-[10px] font-bold text-ink-soft">
                    {new Date(entry.date).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{entry.text}</p>
                {entry.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-sage-soft px-2 py-0.5 text-[10px] font-semibold text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {s.diary.length === 0 && (
        <div className="rounded-[24px] bg-sage-soft p-6 text-center">
          <p className="text-4xl mb-2">📝</p>
          <p className="text-sm text-ink-soft">
            Nenhum registro ainda. Comece hoje!
          </p>
        </div>
      )}
    </div>
  );
}