"use client";

import { useState } from "react";
import { Mascot } from "@/components/art/Mascot";
import { PILLARS, type PillarKey } from "@/lib/quiz";
import { VIDEOS, searchVideos, videosByPillar } from "@/lib/videos";

export default function VideosPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<PillarKey | "all">("all");
  const [playing, setPlaying] = useState<string | null>(null);

  const filtered =
    filter === "all"
      ? searchVideos(query)
      : searchVideos(query).filter((v) => v.pillar === filter);

  return (
    <div className="space-y-5 px-4 pb-24 pt-4">
      <header>
        <h1 className="font-display text-2xl font-medium">Vídeos Rápidos</h1>
        <p className="text-sm text-ink-soft">
          Técnicas de 30-60s para você assistir e aplicar na hora.
        </p>
      </header>

      {/* Busca */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar técnica ou tema…"
        className="w-full rounded-2xl border-2 border-line bg-card px-4 py-3 text-sm outline-none focus:border-moss"
      />

      {/* Filtros por pilar */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => setFilter("all")}
          className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition ${
            filter === "all" ? "bg-moss text-white" : "bg-card text-ink-soft"
          }`}
        >
          Todos
        </button>
        {(Object.entries(PILLARS) as [PillarKey, typeof PILLARS[PillarKey]][]).map(
          ([key, pillar]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition ${
                filter === key ? "bg-moss text-white" : "bg-card text-ink-soft"
              }`}
            >
              {pillar.short}
            </button>
          )
        )}
      </div>

      {/* Lista de vídeos */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-[24px] bg-sage-soft p-6 text-center">
            <p className="text-3xl mb-2">🎬</p>
            <p className="text-sm text-ink-soft">Nenhum vídeo encontrado.</p>
          </div>
        )}

        {filtered.map((video) => (
          <div
            key={video.id}
            className="overflow-hidden rounded-[24px] bg-card shadow-sm"
          >
            {/* Thumbnail / Player placeholder */}
            <button
              onClick={() =>
                setPlaying(playing === video.id ? null : video.id)
              }
              className={`relative flex aspect-video w-full items-center justify-center ${video.color} transition active:opacity-90`}
            >
              <span className="text-6xl">{video.emoji}</span>
              <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-bold text-white">
                ▶ {video.duration}
              </span>
              {playing === video.id && (
                <div className="absolute inset-0 grid place-items-center bg-ink/60">
                  <p className="text-lg font-bold text-white animate-pulse">
                    Reproduzindo…
                  </p>
                </div>
              )}
            </button>

            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-display text-base leading-tight">
                  {video.title}
                </h3>
                <span className="shrink-0 rounded-full bg-sage-soft px-2 py-0.5 text-[10px] font-bold text-ink">
                  {PILLARS[video.pillar].short}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-ink-soft mt-1">
                {video.description}
              </p>
              {video.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-butter/30 px-2 py-0.5 text-[10px] font-semibold text-ink"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[24px] bg-ink p-4 text-paper text-center">
        <Mascot mood="happy" className="size-10 mx-auto mb-2" />
        <p className="text-xs leading-relaxed">
          💡 <b>Dica:</b> assista ao vídeo antes de fazer a missão do dia — a
          técnica fica mais clara vendo na prática.
        </p>
      </div>
    </div>
  );
}