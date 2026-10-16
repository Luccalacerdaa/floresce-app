import { GardenScene } from "./art/Garden";
import { Mascot } from "./art/Mascot";

// Celular com a tela "Hoje" do app, para a landing.
export function PhoneMock({ name = "Theo" }: { name?: string }) {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[290px]">
      <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,var(--color-butter)_0%,transparent_65%)] opacity-60" />
      <div className="rotate-[3deg] overflow-hidden rounded-[42px] border-[8px] border-ink bg-paper shadow-[0_40px_70px_-30px_rgb(30_51_41/0.7)]">
        <div className="mx-auto mt-2 h-5 w-24 rounded-full bg-ink" />
        <div className="space-y-2.5 p-3">
          <div className="flex items-center justify-between px-1">
            <p className="font-display text-[15px]">O jardim de {name}</p>
            <div className="flex gap-1 text-[10px] font-bold">
              <span className="rounded-full bg-clay-soft px-1.5 py-0.5">🔥 4</span>
              <span className="rounded-full bg-butter/60 px-1.5 py-0.5">🌱 620</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-[18px]">
            <GardenScene stages={{ atencao: 3, imitacao: 2, comunicacao: 2, brincar: 3, rotinas: 1 }} className="block w-full" />
          </div>
          <div className="flex items-center gap-2 rounded-[16px] bg-ink p-2.5 text-paper">
            <span className="grid size-9 place-items-center rounded-xl bg-paper text-lg">🫧</span>
            <div className="flex-1 leading-tight">
              <p className="text-[8px] font-bold uppercase tracking-wider text-butter">Missão do dia · sem tela</p>
              <p className="font-display text-[13px]">Bolhas com pausa</p>
            </div>
            <span className="grid size-6 place-items-center rounded-full bg-butter text-[10px] text-ink">▶</span>
          </div>
          <div className="flex items-center gap-2 rounded-[16px] bg-butter/60 p-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-card text-lg">🐶</span>
            <div className="flex-1 leading-tight">
              <p className="text-[8px] font-bold uppercase tracking-wider text-ink-soft">Jogo a dois · 3 min</p>
              <p className="font-display text-[13px]">Cadê o Bicho?</p>
            </div>
          </div>
          <div className="grid grid-cols-4 pt-1 text-center text-[9px] font-bold text-ink-soft">
            <span>🌻<br />Hoje</span>
            <span>🗺️<br />Trilha</span>
            <span>🎮<br />Jogos</span>
            <span>🏆<br />Conquistas</span>
          </div>
        </div>
      </div>
      <div className="absolute -left-10 top-16 animate-float rounded-2xl bg-card px-3 py-2 text-sm font-bold shadow-lg">⭐ Apontou hoje!</div>
      <div className="absolute -right-8 top-40 animate-float rounded-2xl bg-card px-3 py-2 text-sm font-bold shadow-lg [animation-delay:1.2s]">+50 🌱</div>
      <Mascot mood="happy" className="absolute -bottom-6 -left-12 w-24 animate-float [animation-delay:.6s]" />
    </div>
  );
}
