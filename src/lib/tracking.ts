// Pixel do Meta e UTMs. Tudo protegido: sem Pixel ou sem storage, nada quebra.

import { OFFER } from "./config";

type Fbq = (...args: unknown[]) => void;
declare global {
  interface Window {
    fbq?: Fbq;
  }
}

const UTM_KEY = "fl_utm";
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];

const STANDARD_EVENTS = new Set([
  "ViewContent",
  "Lead",
  "CompleteRegistration",
  "InitiateCheckout",
  "Purchase",
]);

export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq(STANDARD_EVENTS.has(event) ? "track" : "trackCustom", event, params);
}

export function captureUtms() {
  if (typeof window === "undefined") return;
  const search = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  for (const key of UTM_PARAMS) {
    const value = search.get(key);
    if (value) found[key] = value;
  }
  if (!Object.keys(found).length) return;
  try {
    localStorage.setItem(UTM_KEY, JSON.stringify(found));
  } catch {}
}

export function getUtms(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(UTM_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function checkoutHref() {
  if (!OFFER.checkoutUrl) return "";
  try {
    const url = new URL(OFFER.checkoutUrl);
    for (const [key, value] of Object.entries(getUtms())) url.searchParams.set(key, value);
    url.searchParams.set("src", "quiz");
    return url.toString();
  } catch {
    return OFFER.checkoutUrl;
  }
}
