// Barra de progresso do quiz: um caule que cresce e ganha folhas até florescer.

const LEAVES = [0.2, 0.4, 0.6, 0.8];

export function SproutProgress({ value }: { value: number }) {
  const pct = Math.min(1, Math.max(0, value));
  return (
    <div
      className="relative h-8"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct * 100)}
      aria-label="Progresso do quiz"
    >
      <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-paper-2" />
      <div
        className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-moss transition-[width] duration-500 ease-out"
        style={{ width: `${pct * 100}%` }}
      />
      {LEAVES.map((at, i) =>
        pct >= at ? (
          <svg
            key={at}
            viewBox="0 0 20 20"
            className={`absolute size-4 -translate-x-1/2 animate-pop ${i % 2 ? "bottom-0" : "top-0"}`}
            style={{ left: `${at * 100}%` }}
            aria-hidden
          >
            <path
              d={i % 2 ? "M10 2c0 8 4 13 9 14 0-7-4-12-9-14Z" : "M10 18C10 10 14 5 19 4c0 7-4 12-9 14Z"}
              fill={i % 2 ? "var(--color-sage)" : "var(--color-moss)"}
            />
          </svg>
        ) : null,
      )}
      <span
        className={`absolute right-0 top-1/2 grid size-8 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full text-base transition ${
          pct >= 1 ? "animate-pop bg-butter" : "bg-paper-2 opacity-60"
        }`}
        aria-hidden
      >
        {pct >= 1 ? "🌼" : "·"}
      </span>
    </div>
  );
}
