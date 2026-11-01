import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { intensityBands, metricDetails, observationIntensity, observations, type Metric, type Observation } from "@/lib/observatory-data";

// Drawing coordinates only: no geography, distance, orientation or real adjacency.
const sectors = [
  { id: "a", path: "M20 20 L180 20 L205 105 L175 145 L20 140 Z", x: 100, y: 78 },
  { id: "b", path: "M190 20 L370 20 L355 145 L185 145 L215 105 Z", x: 280, y: 78 },
  { id: "c", path: "M380 20 L560 20 L560 140 L365 145 Z", x: 460, y: 78 },
  { id: "d", path: "M20 150 L175 155 L195 280 L20 280 Z", x: 100, y: 212 },
  { id: "e", path: "M185 155 L355 155 L380 280 L205 280 Z", x: 280, y: 212 },
  { id: "f", path: "M365 155 L560 150 L560 280 L390 280 Z", x: 460, y: 212 },
];
const number = (value: number) => value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function ExplorationMap({ mapRows, rows, metric, selectedId, onSelect }: { mapRows: Observation[]; rows: Observation[]; metric: Metric; selectedId?: string; onSelect: (id: string) => void }) {
  const id = useId();
  const { label, unit } = metricDetails[metric];
  return <section aria-labelledby={`${id}-heading`} className="mb-10 border-y border-foreground py-8">
    <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 id={`${id}-heading`} className="text-3xl md:text-4xl">Mapa de calor · esquema ilustrativo</h2><p className="label-mono text-terracotta">{label} · {unit}</p></div>
    <p className="mt-4 text-sm text-muted-foreground">Unidades fictícias A–F · sem localização, orientação ou escala geográfica. A posição dos setores não representa proximidade real.</p>
    <TooltipProvider delayDuration={150}>
      <svg viewBox="0 0 580 300" className="my-5 w-full" role="group" aria-label={`Esquema interativo: ${label}, em ${unit}`}>
        {sectors.map((sector) => {
          const row = mapRows.find((item) => item.id === sector.id);
          const available = rows.some((item) => item.id === sector.id);
          const selected = selectedId === sector.id;
          const band = row ? intensityBands[metric].find((item) => item.id === observationIntensity(row, metric)) : undefined;
          const detail = row ? `${row.label}: ${number(row[metric])} ${unit}. ${band?.label}. Dados simulados.` : `Unidade ${sector.id.toUpperCase()}: fora da seleção de paisagem.`;
          return <Tooltip key={sector.id}><TooltipTrigger asChild>
            <Button asChild variant="ghost" className="group h-auto p-0 shadow-none hover:bg-transparent focus-visible:ring-0">
              <g role="button" tabIndex={available ? 0 : -1} aria-disabled={!available} aria-pressed={selected} aria-label={`${detail}${!available ? " Fora dos filtros." : ""}`} onClick={() => { if (available) onSelect(sector.id); }} onKeyDown={(event) => { if (available && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); onSelect(sector.id); } }} className={available ? "cursor-pointer" : "cursor-default"}>
                <title>{detail}</title>
                <path d={sector.path} className={`${available ? band?.fill : "fill-paper-deep"} stroke-foreground group-focus-visible:stroke-terracotta`} strokeWidth={selected ? 5 : 1} />
                {selected && <path d={sector.path} className="fill-none stroke-background" strokeWidth="2" />}
                <rect x={sector.x - 58} y={sector.y - 28} width="116" height="56" className="fill-background" />
                <text x={sector.x} y={sector.y - 5} textAnchor="middle" className="fill-foreground font-mono" fontSize="17">{selected ? "✓ " : ""}{sector.id.toUpperCase()}</text>
                <text x={sector.x} y={sector.y + 17} textAnchor="middle" className="fill-foreground font-mono" fontSize="15">{row && available ? `${number(row[metric])} ${unit}` : "—"}</text>
              </g>
            </Button>
          </TooltipTrigger><TooltipContent className="max-w-64 text-sm">{detail}{!available && " Fora dos filtros atuais."}</TooltipContent></Tooltip>;
        })}
      </svg>
    </TooltipProvider>
    <ul aria-label="Legenda das faixas de intensidade" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">{intensityBands[metric].map((band) => <li key={band.id} className="flex items-center gap-2"><span aria-hidden="true" className={`h-3 w-6 border border-foreground ${band.color}`} />{band.label}</li>)}<li className="flex items-center gap-2"><span aria-hidden="true" className="h-3 w-6 border border-foreground bg-paper-deep" />Fora dos filtros</li></ul>
    <p className="mt-5 text-sm leading-relaxed"><strong>Fonte e método:</strong> conjunto didático local v1, mesmos valores do gráfico e da tabela; cores por faixas fixas ilustrativas, sem interpolação ou limiar de risco. Contorno duplo e ✓ identificam a unidade selecionada.</p>
    <p className="mt-3 text-sm text-muted-foreground">Os seis setores são desenhos arbitrários, não limites territoriais. {observations.length} unidades por janela; nenhum dado geográfico ou serviço externo foi utilizado.</p>
  </section>;
}