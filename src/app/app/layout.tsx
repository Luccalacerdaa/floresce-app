import type { Metadata } from "next";
import { TabBar } from "@/components/app/TabBar";

export const metadata: Metadata = { title: "Floresce · Protótipo do app", robots: { index: false } };

// O protótipo aparece dentro de uma moldura de celular no computador e em tela cheia no celular.
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_20%_10%,var(--color-sky-soft),transparent_40%),radial-gradient(circle_at_80%_90%,var(--color-clay-soft),transparent_40%)] sm:grid sm:place-items-center sm:py-8">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-paper sm:min-h-0 sm:h-[860px] sm:overflow-hidden sm:rounded-[48px] sm:border-[10px] sm:border-ink sm:shadow-[0_40px_80px_-30px_rgb(30_51_41/0.6)]">
        <div className="bg-ink py-1 text-center text-[11px] font-semibold tracking-wide text-butter">
          Protótipo · o app completo chega no beta
        </div>
        <div className="flex-1 sm:overflow-y-auto">{children}</div>
        <TabBar />
      </div>
    </div>
  );
}
