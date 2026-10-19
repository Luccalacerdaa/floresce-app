"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/app", label: "Hoje", emoji: "🌻" },
  { href: "/app/trilha", label: "Trilha", emoji: "🗺️" },
  { href: "/app/jogos", label: "Jogos", emoji: "🎮" },
  { href: "/app/bau", label: "Baú", emoji: "🎁" },
  { href: "/app/conquistas", label: "Conquistas", emoji: "🏆" },
];

export function TabBar() {
  const pathname = usePathname();
  // Dentro de um jogo ou missão, a tela é toda da brincadeira.
  if (/^\/app\/(jogos|missao)\/.+/.test(pathname)) return null;

  return (
    <nav className="sticky bottom-0 z-20 border-t border-line bg-card/95 px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 backdrop-blur">
      <ul className="grid grid-cols-5">
        {TABS.map((tab) => {
          const active = tab.href === "/app" ? pathname === "/app" : pathname.startsWith(tab.href);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`mx-auto flex w-full max-w-16 flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-bold transition ${
                  active ? "bg-sage-soft text-ink" : "text-ink-soft"
                }`}
              >
                <span className={`text-lg transition ${active ? "scale-110" : "grayscale-[60%]"}`}>{tab.emoji}</span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}