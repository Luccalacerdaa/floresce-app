"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/app", label: "Hoje", emoji: "🌻" },
  { href: "/app/trilha", label: "Trilha", emoji: "🗺️" },
  { href: "/app/jogos", label: "Jogos", emoji: "🎮" },
  { href: "/app/bau", label: "Baú", emoji: "🎁" },
  { href: "/app/diario", label: "Diário", emoji: "📝" },
];

const SECONDARY_TABS = [
  { href: "/app/profissionais", label: "Rede", emoji: "🩺" },
  { href: "/app/videos", label: "Vídeos", emoji: "🎬" },
  { href: "/app/relatorio", label: "Relatório", emoji: "📊" },
  { href: "/app/sos", label: "SOS", emoji: "🆘" },
  { href: "/app/conquistas", label: "Conquistas", emoji: "🏆" },
];

export function TabBar() {
  const pathname = usePathname();

  // Dentro de um jogo ou missão, a tela é toda da brincadeira.
  if (/^\/app\/(jogos|missao)\/.+/.test(pathname)) return null;

  return (
    <nav className="sticky bottom-0 z-20 border-t border-line bg-card/95 backdrop-blur pb-[max(env(safe-area-inset-bottom),8px)]">
      {/* Primary tabs */}
      <ul className="grid grid-cols-5 px-2 pt-2">
        {TABS.map((tab) => {
          const active = tab.href === "/app" ? pathname === "/app" : pathname.startsWith(tab.href);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`mx-auto flex w-full max-w-20 flex-col items-center gap-1 rounded-2xl py-2 sm:py-1.5 text-[11px] sm:text-[10px] font-bold transition touch-manipulation ${
                  active ? "bg-sage-soft text-ink" : "text-ink-soft"
                }`}
              >
                <span className={`text-xl sm:text-lg transition ${active ? "scale-110" : "grayscale-[60%]"}`}>{tab.emoji}</span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
      {/* Secondary tabs — scrollable row */}
      <div className="flex gap-1 overflow-x-auto px-3 pt-1 pb-1 scrollbar-hide">
        {SECONDARY_TABS.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 sm:px-3 sm:py-1 text-[11px] sm:text-[10px] font-bold transition touch-manipulation ${
                active ? "bg-butter/40 text-ink" : "bg-paper-2 text-ink-soft"
              }`}
            >
              <span className="text-sm sm:text-xs">{tab.emoji}</span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}