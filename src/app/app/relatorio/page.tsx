"use client";

import { Mascot } from "@/components/art/Mascot";
import { useApp, growth, stages } from "@/lib/appState";
import { PILLARS, type PillarKey } from "@/lib/quiz";
import { TRAIL } from "@/lib/trail";

export default function RelatorioPage() {
  const s = useApp();
  const st = stages(s);
  const totalDays = TRAIL.length;
  const completedDays = s.done.length;
  const pct = Math.round((completedDays / totalDays) * 100);

  const pillarData = (Object.keys(PILLARS) as PillarKey[]).map((key) => ({
    key,
    label: PILLARS[key].short,
    stage: st[key],
    water: s.water[key],
  }));

  return (
    <div className="space-y-5 px-4 pb-24 pt-4">
      <header>
        <h1 className="font-display text-2xl font-medium">Relatório Semanal</h1>
        <p className="text-sm text-ink-soft">
          Resumo do progresso de <b>{s.childName}</b> nesta semana.
        </p>
      </header>

      {/* Card principal */}
      <div className="rounded-[28px] bg-card p-6 shadow-md text-center">
        <Mascot mood="love" className="size-20 mx-auto mb-3" />
        <p className="text-sm text-ink-soft">Progresso na trilha</p>
        <p className="font-display text-4xl mt-1">{pct}%</p>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-paper-2">
          <div
            className="h-full rounded-full bg-moss transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-ink-soft">
          {completedDays} de {totalDays} missões completas · 🔥 {s.streak} dias seguidos
        </p>
      </div>

      {/* Pilares */}
      <section>
        <h2 className="font-display text-lg mb-3">Como estão os 5 pilares</h2>
        <div className="space-y-3">
          {pillarData.map((p) => {
            const maxWater = 12;
            const barPct = Math.min(100, (p.water / maxWater) * 100);
            const stageLabel =
              p.stage === 1 ? "Brotando 🌱" : p.stage === 2 ? "Em botão 🌿" : "Florescendo 🌸";
            return (
              <div key={p.key} className="rounded-[20px] bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-sm">{p.label}</span>
                  <span className="text-xs font-bold text-moss">{stageLabel}</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-paper-2">
                  <div
                    className="h-full rounded-full bg-butter transition-all duration-500"
                    style={{ width: `${barPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Marcos da semana */}
      <section>
        <h2 className="font-display text-lg mb-3">Marcos registrados</h2>
        {s.milestones.length === 0 ? (
          <div className="rounded-[20px] bg-sage-soft p-5 text-center">
            <p className="text-2xl mb-1">⭐</p>
            <p className="text-sm text-ink-soft">
              Nenhum marco registrado ainda. Registre na aba Hoje!
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {s.milestones.map((id) => {
              const m = [
                { id: "olha-nome", emoji: "👂", label: "Olhou ao chamar" },
                { id: "aponta", emoji: "👉", label: "Apontou" },
                { id: "imita-gesto", emoji: "👋", label: "Imitou gesto" },
                { id: "imita-som", emoji: "🐮", label: "Imitou som" },
                { id: "primeira-palavra", emoji: "💬", label: "Palavra nova" },
                { id: "pediu", emoji: "🤲", label: "Pediu sem chorar" },
                { id: "brincou-5", emoji: "🧸", label: "Brincou 5 min" },
                { id: "troca-calma", emoji: "🌈", label: "Troca calma" },
                { id: "frase-dois", emoji: "🔗", label: "Duas palavras" },
                { id: "pergunta", emoji: "❓", label: "Fez pergunta" },
                { id: "contou-historia", emoji: "📖", label: "Contou história" },
                { id: "ajudou-outro", emoji: "🤝", label: "Ajudou alguém" },
              ].find((x) => x.id === id);
              if (!m) return null;
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-butter/40 px-3 py-1.5 text-xs font-semibold text-ink"
                >
                  {m.emoji} {m.label}
                </span>
              );
            })}
          </div>
        )}
      </section>

      {/* Diário */}
      <section>
        <h2 className="font-display text-lg mb-3">Registros no diário</h2>
        {s.diary.length === 0 ? (
          <div className="rounded-[20px] bg-sage-soft p-5 text-center">
            <p className="text-2xl mb-1">📝</p>
            <p className="text-sm text-ink-soft">Nenhum registro no diário ainda.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {s.diary.slice(0, 3).map((entry) => (
              <div key={entry.id} className="rounded-[16px] bg-card p-3 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{entry.mood}</span>
                  <span className="text-[10px] font-bold text-ink-soft">
                    {new Date(entry.date).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-ink-soft line-clamp-2">
                  {entry.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Dica final */}
      <div className="rounded-[24px] bg-ink p-4 text-paper text-center">
        <Mascot mood="wow" className="size-10 mx-auto mb-2" />
        <p className="text-xs leading-relaxed">
          💡 <b>Dica:</b> compartilhe este relatório com o terapeuta de{" "}
          {s.childName} — ele ajuda a ajustar as metas da terapia!
        </p>
      </div>
    </div>
  );
}