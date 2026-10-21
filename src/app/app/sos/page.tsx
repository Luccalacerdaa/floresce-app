"use client";

import { useState } from "react";
import { Mascot } from "@/components/art/Mascot";

type Emergency = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  steps: string[];
  warning?: string;
};

const EMERGENCIES: Emergency[] = [
  {
    id: "crise",
    title: "Crise / Meltdown",
    emoji: "🌪️",
    description: "Quando a criança perde o controle emocional ou sensorial.",
    steps: [
      "Mantenha a calma — sua regulação ajuda a regular a criança.",
      "Reduza estímulos: diminua luz, som, pessoas ao redor.",
      "Não tente conversar ou ensinar durante a crise.",
      "Ofereça um abraço firme ou pressão profunda (se a criança aceitar).",
      "Espere passar. A crise tem começo, meio e fim.",
      "Depois que passar, acolha sem julgar nem dar bronca.",
    ],
    warning: "Se houver risco de autoagressão ou agressão grave, procure atendimento médico imediato.",
  },
  {
    id: "engasgo",
    title: "Engasgo / Asfixia",
    emoji: "🫁",
    description: "A criança colocou algo na boca e não consegue respirar.",
    steps: [
      "Verifique se consegue tossir — tosse é sinal de que o ar está passando.",
      "Se NÃO consegue tossir, chorar ou falar: ligue 192 imediatamente.",
      "Para bebês (<1 ano): 5 tapas nas costas + 5 compressões no peito.",
      "Para crianças (>1 ano): manobra de Heimlich abdominal.",
      "NÃO coloque o dedo na garganta às cegas.",
      "Mesmo que resolva, leve ao pronto-socorro para avaliação.",
    ],
    warning: "Ligue 192 (SAMU) ou 193 (Bombeiros) imediatamente se a criança não conseguir respirar.",
  },
  {
    id: "convulsao",
    title: "Convulsão",
    emoji: "⚡",
    description: "Movimentos involuntários, perda de consciência ou olhar fixo.",
    steps: [
      "Deite a criança de lado em superfície segura.",
      "Proteja a cabeça com algo macio.",
      "NÃO coloque nada na boca da criança.",
      "NÃO segure os movimentos do corpo.",
      "Cronometre a duração da crise.",
      "Se durar mais de 5 minutos, ligue 192.",
    ],
    warning: "Primeira convulsão ou duração >5 min = emergência médica. Ligue 192.",
  },
  {
    id: "febre",
    title: "Febre Alta",
    emoji: "🌡️",
    description: "Temperatura acima de 38°C com desconforto.",
    steps: [
      "Meça a temperatura com termômetro confiável.",
      "Ofereça líquidos e roupas leves.",
      "Medique conforme orientação prévia do pediatra.",
      "Observe sinais de alerta: manchas roxas, rigidez no pescoço, dificuldade respiratória.",
      "Bebês <3 meses com febre = pronto-socorro imediato.",
    ],
    warning: "Febre em bebê <3 meses ou febre >39.5°C que não cede = procure emergência.",
  },
];

const HOTLINES = [
  { name: "SAMU", number: "192", desc: "Emergências médicas" },
  { name: "Bombeiros", number: "193", desc: "Resgate e salvamento" },
  { name: "CVV", number: "188", desc: "Apoio emocional 24h" },
  { name: "Disque 100", number: "100", desc: "Direitos humanos / violência" },
];

export default function SosPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-5 px-4 pb-24 pt-4">
      <header>
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-red-100 text-2xl">🆘</span>
          <div>
            <h1 className="font-display text-2xl font-medium text-red-700">Modo Emergência</h1>
            <p className="text-sm text-ink-soft">Guias rápidos para momentos críticos.</p>
          </div>
        </div>
      </header>

      {/* Aviso importante */}
      <div className="rounded-[20px] bg-red-50 border-2 border-red-200 p-4">
        <p className="text-sm font-bold text-red-800 leading-relaxed">
          ⚠️ Este guia <b>não substitui</b> atendimento médico profissional. Em caso de dúvida ou gravidade, ligue 192 ou vá ao pronto-socorro mais próximo.
        </p>
      </div>

      {/* Telefones de emergência */}
      <section>
        <h2 className="font-display text-lg mb-3">Telefones Úteis</h2>
        <div className="grid grid-cols-2 gap-3">
          {HOTLINES.map((h) => (
            <a
              key={h.number}
              href={`tel:${h.number}`}
              className="flex flex-col items-center rounded-[20px] bg-card p-4 shadow-sm transition active:scale-95"
            >
              <span className="font-display text-2xl font-bold text-moss">{h.number}</span>
              <span className="text-xs font-bold mt-1">{h.name}</span>
              <span className="text-[10px] text-ink-soft mt-0.5">{h.desc}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Guias de emergência */}
      <section>
        <h2 className="font-display text-lg mb-3">Guias Rápidos</h2>
        <div className="space-y-3">
          {EMERGENCIES.map((e) => {
            const isOpen = expanded === e.id;
            return (
              <div key={e.id} className="overflow-hidden rounded-[24px] bg-card shadow-sm">
                <button
                  onClick={() => setExpanded(isOpen ? null : e.id)}
                  className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-paper-2"
                >
                  <span className="text-3xl">{e.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-base leading-tight">{e.title}</h3>
                    <p className="text-xs text-ink-soft mt-0.5 line-clamp-1">{e.description}</p>
                  </div>
                  <span className={`text-ink-soft transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                </button>
                {isOpen && (
                  <div className="border-t border-line p-4 space-y-3">
                    <p className="text-sm text-ink-soft">{e.description}</p>
                    <ol className="space-y-2">
                      {e.steps.map((step, i) => (
                        <li key={i} className="flex gap-2 text-sm leading-relaxed">
                          <span className="shrink-0 grid size-6 place-items-center rounded-full bg-sage-soft text-xs font-bold text-ink">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                    {e.warning && (
                      <div className="mt-3 rounded-[16px] bg-red-50 border border-red-200 p-3">
                        <p className="text-xs font-bold text-red-700 leading-relaxed">🚨 {e.warning}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Dica final */}
      <div className="rounded-[24px] bg-ink p-4 text-paper text-center">
        <Mascot mood="think" className="size-10 mx-auto mb-2" />
        <p className="text-xs leading-relaxed">
          💡 <b>Prevenção:</b> converse com o pediatra sobre um plano de emergência personalizado para {""}
          situações específicas do seu filho.
        </p>
      </div>
    </div>
  );
}