"use client";

import { useState } from "react";
import { Mascot } from "@/components/art/Mascot";
import {
  PROFESSIONALS,
  SPECIALTIES,
  searchProfessionals,
  type Specialty,
} from "@/lib/professionals";

export default function ProfissionaisPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Specialty | "all">("all");

  const filtered = filter === "all"
    ? searchProfessionals(query)
    : searchProfessionals(query).filter((p) => p.specialty === filter);

  return (
    <div className="space-y-5 px-4 pb-24 pt-4">
      <header>
        <h1 className="font-display text-2xl font-medium">Rede de Profissionais</h1>
        <p className="text-sm text-ink-soft">
          Encontre especialistas próximos a você. Dados ilustrativos no protótipo.
        </p>
      </header>

      {/* Busca */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por nome, cidade ou especialidade…"
        className="w-full rounded-2xl border-2 border-line bg-card px-4 py-3 text-sm outline-none focus:border-moss"
      />

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => setFilter("all")}
          className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition ${
            filter === "all" ? "bg-moss text-white" : "bg-card text-ink-soft"
          }`}
        >
          Todos
        </button>
        {(Object.entries(SPECIALTIES) as [Specialty, typeof SPECIALTIES[Specialty]][]).map(
          ([key, spec]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition ${
                filter === key ? "bg-moss text-white" : "bg-card text-ink-soft"
              }`}
            >
              {spec.emoji} {spec.label}
            </button>
          )
        )}
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-[24px] bg-sage-soft p-6 text-center">
            <p className="text-3xl mb-2">🔍</p>
            <p className="text-sm text-ink-soft">Nenhum profissional encontrado.</p>
          </div>
        )}
        {filtered.map((prof) => (
          <div key={prof.id} className="rounded-[24px] bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                  {SPECIALTIES[prof.specialty].emoji} {SPECIALTIES[prof.specialty].label}
                </p>
                <h3 className="font-display text-lg leading-tight">{prof.name}</h3>
                <p className="text-xs text-ink-soft mt-0.5">
                  📍 {prof.city}, {prof.state}
                  {prof.crm ? ` · ${prof.crm}` : ""}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-butter-dark">⭐ {prof.rating}</p>
                <p className="text-[10px] text-ink-soft">{prof.reviewCount} avaliações</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-ink-soft mt-2">{prof.bio}</p>
            {prof.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {prof.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-sage-soft px-2 py-0.5 text-[10px] font-semibold text-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-4 flex gap-2">
              {prof.phone && (
                <a
                  href={`tel:${prof.phone}`}
                  className="flex-1 rounded-full bg-moss py-2 text-center text-xs font-bold text-white shadow active:scale-95 transition"
                >
                  📞 Ligar
                </a>
              )}
              {prof.instagram && (
                <span className="flex-1 rounded-full bg-card border-2 border-line py-2 text-center text-xs font-bold text-ink-soft">
                  📸 {prof.instagram}
                </span>
              )}
              {prof.acceptsPlan && (
                <span className="shrink-0 rounded-full bg-butter/40 px-3 py-2 text-[10px] font-bold text-ink">
                  ✓ Convênio
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[24px] bg-ink p-4 text-paper text-center">
        <Mascot mood="think" className="size-10 mx-auto mb-2" />
        <p className="text-xs leading-relaxed">
          💡 <b>Dica:</b> sempre verifique o registro profissional e agende uma avaliação antes de iniciar qualquer terapia.
        </p>
      </div>
    </div>
  );
}