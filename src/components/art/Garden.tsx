// Plantas e o jardim. Cada pilar do desenvolvimento é uma planta que cresce em 4 estágios.

import type { PillarKey } from "@/lib/quiz";

export type PlantKind = "girassol" | "tulipa" | "campanula" | "margarida" | "lavanda";
export type GrowthStage = 0 | 1 | 2 | 3; // semente, broto, botão, flor

export const PILLAR_PLANT: Record<PillarKey, { kind: PlantKind; name: string; color: string }> = {
  atencao: { kind: "girassol", name: "Girassol", color: "#f6c443" },
  imitacao: { kind: "tulipa", name: "Tulipa", color: "#f2a7a0" },
  comunicacao: { kind: "campanula", name: "Campânula", color: "#7fb3d5" },
  brincar: { kind: "margarida", name: "Margarida", color: "#ffffff" },
  rotinas: { kind: "lavanda", name: "Lavanda", color: "#b9a7e0" },
};

const STEM = "#4e7a4a";
const LEAF = "#6f9d63";

function Leaves({ y, size = 1 }: { y: number; size?: number }) {
  return (
    <>
      <path d={`M40 ${y}c-${10 * size} -${2 * size} -${16 * size} -${9 * size} -${17 * size} -${17 * size} ${9 * size} 0 ${16 * size} ${6 * size} ${17 * size} ${17 * size}Z`} fill={LEAF} />
      <path d={`M40 ${y - 6}c${10 * size} -${2 * size} ${16 * size} -${9 * size} ${17 * size} -${17 * size} -${9 * size} 0 -${16 * size} ${6 * size} -${17 * size} ${17 * size}Z`} fill="#8fb37f" />
    </>
  );
}

function Flower({ kind, color }: { kind: PlantKind; color: string }) {
  switch (kind) {
    case "girassol":
      return (
        <g>
          {Array.from({ length: 12 }, (_, i) => (
            <ellipse key={i} cx="40" cy="22" rx="4.5" ry="10" fill={color} transform={`rotate(${i * 30} 40 34)`} />
          ))}
          <circle cx="40" cy="34" r="9" fill="#7a4e2a" />
          <circle cx="40" cy="34" r="5" fill="#5c3a1f" />
        </g>
      );
    case "tulipa":
      return (
        <g>
          <path d="M28 26c0 14 5 20 12 20s12-6 12-20l-6 6-6-10-6 10Z" fill={color} />
          <path d="M34 30c2 9 4 14 6 16-6 0-10-6-10-16Z" fill="#e88b83" />
        </g>
      );
    case "campanula":
      return (
        <g>
          <path d="M40 18c-6 0-10 6-10 14l-3 6h26l-3-6c0-8-4-14-10-14Z" fill={color} />
          <path d="M27 38c2 3 5 4 6 1 2 3 5 3 7 0 2 3 5 3 7 0 1 3 4 2 6-1Z" fill="#5f97bd" />
          <circle cx="40" cy="41" r="2.5" fill="#f6c443" />
        </g>
      );
    case "margarida":
      return (
        <g>
          {Array.from({ length: 10 }, (_, i) => (
            <ellipse key={i} cx="40" cy="23" rx="4" ry="9.5" fill={color} stroke="#e7dfcf" strokeWidth="1" transform={`rotate(${i * 36} 40 33)`} />
          ))}
          <circle cx="40" cy="33" r="7" fill="#f6c443" />
        </g>
      );
    case "lavanda":
      return (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <ellipse cx={36} cy={42 - i * 5} rx="3.6" ry="4.6" fill={color} />
              <ellipse cx={44} cy={44 - i * 5} rx="3.6" ry="4.6" fill="#a08fd0" />
            </g>
          ))}
          <ellipse cx="40" cy="12" rx="3" ry="4" fill={color} />
        </g>
      );
  }
}

/** Planta como <g> para usar dentro de outro SVG. Área: 80 × 120, chão em y = 112. */
export function PlantG({ kind, stage, color }: { kind: PlantKind; stage: GrowthStage; color: string }) {
  return (
    <g>
      <ellipse cx="40" cy="113" rx="22" ry="6" fill="#8a6a4a" />
      <ellipse cx="40" cy="111" rx="18" ry="4" fill="#a3825e" />
      {stage === 0 && (
        <g>
          <ellipse cx="40" cy="106" rx="7" ry="5" fill="#c79b62" />
          <path d="M40 101c0-3 2-5 4-6" stroke={STEM} strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      )}
      {stage === 1 && (
        <g>
          <path d="M40 111V92" stroke={STEM} strokeWidth="3" strokeLinecap="round" />
          <Leaves y={96} size={0.6} />
        </g>
      )}
      {stage === 2 && (
        <g>
          <path d="M40 111V50" stroke={STEM} strokeWidth="3.4" strokeLinecap="round" />
          <Leaves y={92} />
          <Leaves y={72} size={0.7} />
          <ellipse cx="40" cy="46" rx="7" ry="10" fill={color} stroke="#6f9d63" strokeWidth="2" />
        </g>
      )}
      {stage === 3 && (
        <g>
          <path d="M40 111V40" stroke={STEM} strokeWidth="3.6" strokeLinecap="round" />
          <Leaves y={94} />
          <Leaves y={74} size={0.8} />
          <g transform="translate(40 34) scale(1.35) translate(-40 -34)">
            <Flower kind={kind} color={color} />
          </g>
        </g>
      )}
    </g>
  );
}

export function Plant({
  pillar,
  stage,
  className = "",
}: {
  pillar: PillarKey;
  stage: GrowthStage;
  className?: string;
}) {
  const p = PILLAR_PLANT[pillar];
  return (
    <svg viewBox="0 0 80 120" className={className} aria-hidden>
      <PlantG kind={p.kind} stage={stage} color={p.color} />
    </svg>
  );
}

const ORDER: PillarKey[] = ["atencao", "imitacao", "comunicacao", "brincar", "rotinas"];

/** Cena do jardim com as 5 plantas. */
export function GardenScene({
  stages,
  className = "",
  showSun = true,
}: {
  stages: Record<PillarKey, GrowthStage>;
  className?: string;
  showSun?: boolean;
}) {
  return (
    <svg viewBox="0 0 400 230" className={className} role="img" aria-label="Jardim com cinco plantas">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe7f1" />
          <stop offset="1" stopColor="#f3efe2" />
        </linearGradient>
      </defs>
      <rect width="400" height="230" fill="url(#sky)" />
      {showSun && (
        <g>
          <circle cx="340" cy="46" r="24" fill="#f6c443" />
          <circle cx="340" cy="46" r="34" fill="#f6c443" opacity=".18" />
        </g>
      )}
      <g fill="#fff" opacity=".9">
        <ellipse cx="70" cy="44" rx="26" ry="10" />
        <ellipse cx="90" cy="38" rx="18" ry="12" />
        <ellipse cx="220" cy="30" rx="22" ry="8" />
      </g>
      <path d="M0 150c70-30 140-30 210-8s130 18 190-6v94H0Z" fill="#b9cf9f" />
      <path d="M0 176c80-18 160-14 240 0s110 6 160-6v60H0Z" fill="#9dbb84" />
      {ORDER.map((key, i) => {
        const p = PILLAR_PLANT[key];
        return (
          <g key={key} transform={`translate(${-4 + i * 78} ${80}) scale(1.12)`}>
            <PlantG kind={p.kind} stage={stages[key]} color={p.color} />
          </g>
        );
      })}
    </svg>
  );
}
