// As 168 horas da semana: 2 de terapia, 166 com a família.

const DAYS = ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"];
const THERAPY = new Set(["1-15", "3-15"]); // terça e quinta, 15h

export function WeekDots() {
  return (
    <figure className="rounded-[28px] border border-line bg-card/80 p-4 shadow-[0_20px_60px_-30px_rgb(30_51_41/0.35)] sm:p-6">
      <div className="space-y-[5px]">
        {DAYS.map((day, d) => (
          <div key={day} className="flex items-center gap-2">
            <span className="w-7 shrink-0 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">{day}</span>
            <div className="grid flex-1 grid-cols-24 gap-[3px]">
              {Array.from({ length: 24 }, (_, h) => {
                const therapy = THERAPY.has(`${d}-${h}`);
                return (
                  <span
                    key={h}
                    className={`aspect-square rounded-full ${therapy ? "scale-125 bg-clay ring-2 ring-clay-soft" : "bg-sage/70"} animate-pop`}
                    style={{ animationDelay: `${(d * 24 + h) * 6}ms` }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink-soft">
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-clay" /> 2 h de terapia
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-sage" /> 166 h com você
        </span>
      </figcaption>
    </figure>
  );
}
