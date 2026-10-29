// Mapa estilizado e ilustrativo — não representa limites nem medições reais.
import { useId } from "react";
const cells: { x: number; y: number; h: 1 | 2 | 3 | 4 | 5 }[] = [];
const outline = (x: number, y: number) => {
  const dx = (x - 5.5) / 5.2, dy = (y - 6.5) / 6.4;
  return dx * dx + dy * dy < 1 - Math.sin(x * 1.3 + y) * 0.08;
};
for (let y = 0; y < 13; y++)
  for (let x = 0; x < 11; x++) {
    if (!outline(x, y)) continue;
    const d = Math.hypot(x - 5.2, y - 5.8);
    const n = (Math.sin(x * 2.1) + Math.cos(y * 1.7)) * 0.6;
    const v = 5 - Math.floor((d + n) / 1.35);
    cells.push({ x, y, h: Math.max(1, Math.min(5, v)) as 1 | 2 | 3 | 4 | 5 });
  }

const fill: Record<number, string> = {
  1: "fill-heat-1", 2: "fill-heat-2", 3: "fill-heat-3", 4: "fill-heat-4", 5: "fill-heat-5",
};

export function HeatMap({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const s = 30;
  return (
    <figure className="relative">
      <svg viewBox="-30 -30 390 450" className="w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-desc`}>
        <title id={`${id}-title`}>Esquema conceitual de calor urbano, sem localização geográfica</title>
        <desc id={`${id}-desc`}>Quadrículas fictícias: intensidade relativa maior no centro e menor nas bordas. Cinco níveis qualitativos, sem unidade física. Forma e distribuição não representam limites ou medições de São Paulo.</desc>
        <defs>
          <pattern id={`${id}-veg`} width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1" className="fill-paper" />
          </pattern>
        </defs>
        {cells.map((c) => (
          <g key={`${c.x}-${c.y}`}>
            <rect x={c.x * s} y={c.y * s} width={s} height={s} className={`${fill[c.h]} stroke-charcoal`} strokeWidth="0.4" />
            {c.h === 1 && <rect x={c.x * s} y={c.y * s} width={s} height={s} fill={`url(#${id}-veg)`} opacity="0.6" />}
          </g>
        ))}
        {!compact && (
          <g className="fill-charcoal font-mono" fontSize="8" letterSpacing="1">
            <text x="0" y="-14">ESQUEMA CONCEITUAL</text>
            <text x="240" y="-14">SEM GEOLOCALIZAÇÃO</text>
            {/* norte */}
            {/* escala */}
            <g transform="translate(0 405)">
              <rect width="30" height="4" className="fill-charcoal" />
              <rect x="30" width="30" height="4" className="fill-paper stroke-charcoal" strokeWidth="0.6" />
              <text x="0" y="14">0</text>
              <text x="0" y="14">SEM ESCALA ESPACIAL</text>
            </g>
          </g>
        )}
      </svg>
      {!compact && (
        <figcaption className="mt-3 border-t border-foreground pt-3">
          <div className="flex items-center gap-1" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((h) => (
              <span key={h} className={`h-2.5 flex-1 bg-heat-${h}`} />
            ))}
          </div>
          <div className="label-mono mt-1.5 flex justify-between text-muted-foreground">
            <span>Mais fresco</span><span>Mais quente</span>
          </div>
          <p className="label-mono mt-3 text-muted-foreground">
            Fig. 01 — Esquema conceitual, não geográfico · Intensidade qualitativa, sem unidade física · <span className="text-terracotta">Dados simulados</span> · Fonte: ilustração Termômetro Urbano
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Distribuição criada matematicamente para ilustrar maior calor no centro e menor nas bordas. Não representa medições, limites ou relações causais reais.</p>
        </figcaption>
      )}
    </figure>
  );
}
