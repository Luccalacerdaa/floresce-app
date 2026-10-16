import type { Metadata, Viewport } from "next";
import { Fraunces, Figtree } from "next/font/google";
import { MetaPixel } from "@/components/MetaPixel";
import { BRAND } from "@/lib/config";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${BRAND.name} · Brincadeiras que estimulam a fala em casa`,
  description:
    "Descubra o perfil de comunicação do seu filho em 3 minutos e receba as primeiras brincadeiras de 10 minutos para estimular a fala e a conexão em casa.",
};

export const viewport: Viewport = {
  themeColor: "#f7f1e6",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${fraunces.variable} ${figtree.variable} min-h-dvh`}>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
