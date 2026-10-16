import Link from "next/link";
import { BRAND } from "@/lib/config";
import { Logo } from "./Brand";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2/60">
      <div className="mx-auto max-w-5xl space-y-5 px-4 py-10 text-sm text-ink-soft sm:px-6">
        <Logo />
        <p className="max-w-2xl">
          O {BRAND.name} é um programa de orientação para pais. Não faz diagnóstico, não é tratamento e não
          substitui a avaliação nem o acompanhamento de profissionais de saúde.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacidade" className="underline underline-offset-4 hover:text-ink">
            Política de Privacidade
          </Link>
          {BRAND.contactEmail && (
            <a href={`mailto:${BRAND.contactEmail}`} className="underline underline-offset-4 hover:text-ink">
              {BRAND.contactEmail}
            </a>
          )}
        </div>
        <p>© 2026 {BRAND.name}</p>
      </div>
    </footer>
  );
}
