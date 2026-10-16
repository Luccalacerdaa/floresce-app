"use client";

import Link from "next/link";
import { useState } from "react";
import { Mascot } from "@/components/art/Mascot";
import { buttonStyles } from "@/components/ui";
import { actions, useApp } from "@/lib/appState";

// Protótipo do retorno por vídeo. No beta, a IA analisa e uma fonoaudióloga revisa antes do envio.
export default function VideoPage() {
  const s = useApp();
  const [step, setStep] = useState<"start" | "sent" | "feedback">("start");

  return (
    <div className="space-y-5 px-4 pb-10 pt-4">
      <Link href="/app" className="text-sm font-semibold text-ink-soft">
        ← Hoje
      </Link>
      <h1 className="font-display text-2xl font-medium">Retorno da brincadeira</h1>

      {step === "start" && (
        <>
          <div className="grid aspect-[4/5] place-items-center rounded-[30px] bg-ink text-center text-paper">
            <div className="space-y-4 p-6">
              <div className="mx-auto grid size-24 place-items-center rounded-full border-4 border-paper/30 text-5xl">🎬</div>
              <p className="font-display text-xl">Grave até 1 minuto de vocês brincando</p>
              <p className="text-sm text-paper/70">
                Celular apoiado, de lado, mostrando você e {s.childName}. Não precisa ficar perfeito.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              actions.sendVideo();
              setStep("sent");
            }}
            className={`${buttonStyles.primary} w-full`}
          >
            ● Gravar (simulação)
          </button>
          <p className="text-center text-xs text-ink-soft">🔒 Vídeo privado, apagado em 30 dias, nunca usado em anúncios.</p>
        </>
      )}

      {step === "sent" && (
        <div className="space-y-4 rounded-[30px] bg-card p-6 text-center">
          <Mascot mood="love" className="mx-auto size-24" />
          <h2 className="font-display text-2xl">Vídeo enviado! +40 🌱</h2>
          <p className="text-ink-soft">No beta, o retorno chega em até 24 horas, revisado por uma fonoaudióloga. Veja um exemplo:</p>
          <button onClick={() => setStep("feedback")} className={`${buttonStyles.dark} w-full`}>
            Ver exemplo de retorno
          </button>
        </div>
      )}

      {step === "feedback" && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-[24px] bg-sky-soft p-4">
            <div className="grid size-12 place-items-center rounded-full bg-card text-2xl">👩‍⚕️</div>
            <div className="text-sm">
              <p className="font-bold">Retorno revisado</p>
              <p className="text-ink-soft">Exemplo · missão “Bolhas com pausa”</p>
            </div>
          </div>
          <Feedback tone="bg-sage-soft" title="✅ O que você fez muito bem">
            Você ficou na altura dos olhos de {s.childName} e esperou antes de soprar de novo. Aos 0:34, {s.childName} olhou
            para o seu rosto — exatamente o que queríamos!
          </Feedback>
          <Feedback tone="bg-clay-soft/70" title="🔧 Um ajuste para amanhã">
            Quando {s.childName} olhou, você soprou na hora. Tente dizer “bolha!” primeiro e só depois soprar: assim a palavra
            fica ligada ao pedido.
          </Feedback>
          <Feedback tone="bg-butter/40" title="➡️ Próximo passo">
            Repita a missão mais 2 vezes nesta semana. Quando o olhar ficar fácil, vamos esperar um som ou gesto antes de soprar.
          </Feedback>
          <Link href="/app" className={`${buttonStyles.dark} w-full`}>
            Voltar ao jardim
          </Link>
        </div>
      )}
    </div>
  );
}

function Feedback({ tone, title, children }: { tone: string; title: string; children: React.ReactNode }) {
  return (
    <div className={`reveal rounded-[24px] ${tone} p-5`}>
      <p className="font-bold">{title}</p>
      <p className="mt-1.5 leading-relaxed">{children}</p>
    </div>
  );
}
