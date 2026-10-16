// Estado do protótipo do app, guardado no navegador. No app real isso vai para o Supabase.

import { useSyncExternalStore } from "react";
import type { GrowthStage } from "@/components/art/Garden";
import { computeProfile, STAGES, type PillarKey } from "./quiz";
import { loadQuiz } from "./storage";

export type AppState = {
  childName: string;
  seeds: number;
  streak: number;
  lastActive: string | null;
  base: Record<PillarKey, GrowthStage>;
  water: Record<PillarKey, number>;
  done: number[];
  stickers: string[];
  milestones: string[];
  screen: { day: string; seconds: number };
  videos: number;
};

const KEY = "fl_app";
const ZERO = { atencao: 0, imitacao: 0, comunicacao: 0, brincar: 0, rotinas: 0 };

const DEFAULT: AppState = {
  childName: "Theo",
  seeds: 0,
  streak: 0,
  lastActive: null,
  base: { atencao: 1, imitacao: 1, comunicacao: 1, brincar: 2, rotinas: 2 },
  water: ZERO,
  done: [],
  stickers: [],
  milestones: [],
  screen: { day: "", seconds: 0 },
  videos: 0,
};

let state: AppState | null = null;
const listeners = new Set<() => void>();

function init(): AppState {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) return { ...DEFAULT, ...JSON.parse(saved) };
  } catch {}
  const quiz = loadQuiz();
  if (!quiz) return DEFAULT;
  const profile = computeProfile(quiz.answers);
  const base = Object.fromEntries(profile.pillars.map((p) => [p.key, STAGES[p.stage].growth])) as AppState["base"];
  return { ...DEFAULT, childName: profile.name, seeds: quiz.seeds ?? 0, base };
}

function get() {
  if (!state) state = init();
  return state;
}

function set(update: (s: AppState) => AppState) {
  state = update(get());
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useApp() {
  return useSyncExternalStore(subscribe, get, () => DEFAULT);
}

export const today = () => new Date().toLocaleDateString("sv-SE");

function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toLocaleDateString("sv-SE");
}

export function growth(s: AppState, pillar: PillarKey): GrowthStage {
  return Math.min(3, s.base[pillar] + Math.floor(s.water[pillar] / 2)) as GrowthStage;
}

export function stages(s: AppState) {
  return Object.fromEntries((Object.keys(ZERO) as PillarKey[]).map((k) => [k, growth(s, k)])) as Record<PillarKey, GrowthStage>;
}

export function screenSecondsToday(s: AppState) {
  return s.screen.day === today() ? s.screen.seconds : 0;
}

export const actions = {
  completeMission(day: number, pillar: PillarKey, sticker: string) {
    set((s) => {
      if (s.done.includes(day)) return s;
      const t = today();
      const streak = s.lastActive === t ? s.streak : s.lastActive === yesterday() ? s.streak + 1 : 1;
      return {
        ...s,
        seeds: s.seeds + 50,
        streak,
        lastActive: t,
        // Cada missão vale 2 regadas: a planta cresce um estágio.
        water: { ...s.water, [pillar]: s.water[pillar] + 2 },
        done: [...s.done, day],
        stickers: s.stickers.includes(sticker) ? s.stickers : [...s.stickers, sticker],
      };
    });
  },
  addSeeds(n: number) {
    set((s) => ({ ...s, seeds: s.seeds + n }));
  },
  toggleMilestone(id: string) {
    set((s) => {
      const has = s.milestones.includes(id);
      return {
        ...s,
        milestones: has ? s.milestones.filter((m) => m !== id) : [...s.milestones, id],
        seeds: has ? s.seeds : s.seeds + 30,
      };
    });
  },
  addScreenSeconds(seconds: number) {
    set((s) => {
      const t = today();
      const current = s.screen.day === t ? s.screen.seconds : 0;
      return { ...s, screen: { day: t, seconds: current + Math.round(seconds) } };
    });
  },
  sendVideo() {
    set((s) => ({ ...s, videos: s.videos + 1, seeds: s.seeds + 40 }));
  },
  reset() {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    state = null;
    listeners.forEach((l) => l());
  },
};

export const MILESTONES = [
  { id: "olha-nome", label: "Olhou quando chamei pelo nome", emoji: "👂" },
  { id: "aponta", label: "Apontou para me mostrar algo", emoji: "👉" },
  { id: "imita-gesto", label: "Imitou um gesto", emoji: "👋" },
  { id: "imita-som", label: "Imitou um som", emoji: "🐮" },
  { id: "primeira-palavra", label: "Disse uma palavra nova", emoji: "💬" },
  { id: "pediu", label: "Pediu algo sem chorar", emoji: "🤲" },
  { id: "brincou-5", label: "Brincou junto por 5 minutos", emoji: "🧸" },
  { id: "troca-calma", label: "Trocou de atividade sem crise", emoji: "🌈" },
];

export const BADGES = [
  { id: "primeira-missao", label: "Primeira missão", emoji: "🌱", test: (s: AppState) => s.done.length >= 1 },
  { id: "tres-dias", label: "3 dias seguidos", emoji: "🔥", test: (s: AppState) => s.streak >= 3 },
  { id: "semana", label: "Semana completa", emoji: "🏅", test: (s: AppState) => s.done.length >= 6 },
  { id: "primeira-flor", label: "Primeira flor nova", emoji: "🌸", test: (s: AppState) => Object.values(s.water).some((w) => w >= 2) },
  { id: "marco", label: "Primeiro marco", emoji: "⭐", test: (s: AppState) => s.milestones.length >= 1 },
  { id: "video", label: "Primeiro vídeo", emoji: "🎬", test: (s: AppState) => s.videos >= 1 },
  { id: "colecionador", label: "5 figurinhas", emoji: "📒", test: (s: AppState) => s.stickers.length >= 5 },
  { id: "jardineiro", label: "500 sementes", emoji: "🧑‍🌾", test: (s: AppState) => s.seeds >= 500 },
];
