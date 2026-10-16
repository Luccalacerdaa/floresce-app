import type { Answers } from "./quiz";

const QUIZ_KEY = "fl_quiz";

export type SavedQuiz = { answers: Answers; parentName: string; savedAt: string };

export function saveQuiz(data: SavedQuiz) {
  try {
    sessionStorage.setItem(QUIZ_KEY, JSON.stringify(data));
    localStorage.setItem(QUIZ_KEY, JSON.stringify(data));
  } catch {}
}

export function loadQuiz(): SavedQuiz | null {
  try {
    const raw = sessionStorage.getItem(QUIZ_KEY) ?? localStorage.getItem(QUIZ_KEY);
    return raw ? (JSON.parse(raw) as SavedQuiz) : null;
  } catch {
    return null;
  }
}
