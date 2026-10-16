// Ilustração do retorno sobre o vídeo (a funcionalidade principal do app).

export function FeedbackMock() {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div className="absolute -inset-6 -z-10 rounded-[48px] bg-clay-soft/60 blur-2xl" />
      <div className="rotate-[-2deg] rounded-[34px] border-[6px] border-ink bg-card p-3 shadow-[0_30px_60px_-30px_rgb(30_51_41/0.6)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-gradient-to-br from-sage-soft via-paper-2 to-clay-soft">
          <svg viewBox="0 0 200 150" className="absolute inset-0 size-full" aria-hidden>
            <circle cx="70" cy="70" r="22" fill="#e9c9a8" />
            <rect x="48" y="92" width="44" height="58" rx="20" fill="var(--color-moss)" />
            <circle cx="140" cy="88" r="15" fill="#f0d2b4" />
            <rect x="124" y="104" width="32" height="46" rx="15" fill="var(--color-butter)" />
            <circle cx="108" cy="52" r="7" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".9" />
            <circle cx="120" cy="38" r="4.5" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".8" />
            <circle cx="96" cy="34" r="3.5" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".7" />
          </svg>
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-semibold text-paper">
            ● 0:58
          </span>
        </div>
        <div className="space-y-2 px-1 pb-1 pt-3 text-[13px] leading-snug">
          <p className="rounded-2xl bg-sage-soft px-3 py-2">
            <b>✅ Muito bem:</b> você esperou antes de soprar de novo — e ele olhou para você.
          </p>
          <p className="rounded-2xl bg-clay-soft/70 px-3 py-2">
            <b>🔧 Ajuste:</b> desça mais, para ficar na altura dos olhos dele.
          </p>
          <p className="rounded-2xl bg-paper-2 px-3 py-2">
            <b>➡️ Amanhã:</b> diga “bolha” logo antes de soprar.
          </p>
        </div>
      </div>
    </div>
  );
}
