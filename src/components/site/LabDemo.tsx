import { useState } from "react";
import { Button } from "@/components/ui/button";
import { defaultWeights, rankLabAreas, type LabWeights } from "@/lib/lab-data";

const parameters = [
  { key: "temperature", label: "Temperatura de superfície" },
  { key: "vegetation", label: "Déficit de cobertura vegetal" },
  { key: "social", label: "Contexto socioeconômico" },
] as const;
const number = (value: number) => value.toLocaleString("pt-BR", { maximumFractionDigits: 1, minimumFractionDigits: 1 });

export function LabDemo() {
  const [weights, setWeights] = useState<LabWeights>({ ...defaultWeights });
  const rows = rankLabAreas(weights);
  const total = weights.temperature + weights.vegetation + weights.social;
  const first = rows[0];
  return (
    <div className="mt-7 border-y border-foreground">
      <div className="grid gap-8 py-7 lg:grid-cols-[240px_minmax(0,1fr)]">
        <fieldset className="min-w-0">
          <legend className="label-mono">Pesos do índice ilustrativo</legend>
          <div className="mt-6 space-y-6">{parameters.map(({ key, label }) => <div key={key}>
            <label htmlFor={`weight-${key}`} className="flex items-start justify-between gap-4 text-sm"><span>{label}</span><span className="font-mono tabular-nums">{weights[key]}</span></label>
            <input id={`weight-${key}`} type="range" min="0" max="100" step="5" value={weights[key]} onChange={(event) => setWeights((previous) => ({ ...previous, [key]: Number(event.target.value) }))} className="mt-3 h-8 w-full cursor-pointer accent-terracotta" aria-describedby="lab-weights-note" />
          </div>)}</div>
          <p id="lab-weights-note" className="mt-4 text-sm text-muted-foreground">Pesos relativos de 0 a 100, normalizados pela soma. Não são coeficientes aprendidos por IA.</p>
          <Button variant="outline" className="mt-5 border-foreground shadow-none" onClick={() => setWeights({ ...defaultWeights })}>Restaurar pesos</Button>
        </fieldset>
        <div className="min-w-0">
          <figure aria-labelledby="lab-chart-title" aria-describedby="lab-chart-desc">
            <figcaption id="lab-chart-title" className="font-display text-2xl">Prioridade ilustrativa por unidade fictícia</figcaption>
            <p id="lab-chart-desc" className="mt-2 text-sm text-muted-foreground">Índice de 0 a 100 pontos, não probabilidade de risco. Alta: ≥ 65; intermediária: ≥ 40 e &lt; 65; menor: &lt; 40. A tabela apresenta os mesmos resultados.</p>
            {total === 0 ? <p role="status" className="my-8 border-l-2 border-terracotta pl-4">Sem classificação: todos os pesos estão zerados.</p> : <svg viewBox="0 0 600 260" className="mt-5 w-full" role="img" aria-label={rows.map((row) => `Unidade ${row.id.toUpperCase()}: ${number(row.score)} pontos, prioridade ${row.priority.toLowerCase()}`).join("; ")}>
              {[0, 25, 50, 75, 100].map((tick) => <g key={tick}><line x1={45 + tick * 4.5} x2={45 + tick * 4.5} y1="10" y2="225" className="stroke-border"/><text x={45 + tick * 4.5} y="250" textAnchor="middle" className="fill-muted-foreground font-mono text-sm">{tick}</text></g>)}
              {rows.map((row, index) => <g key={row.id}><text x="15" y={index * 36 + 31} className="fill-foreground font-mono text-base">{row.id.toUpperCase()}</text><rect x="45" y={index * 36 + 12} width={row.score * 4.5} height="24" className={row.priority === "Alta" ? "fill-terracotta" : row.priority === "Intermediária" ? "fill-foreground" : "fill-vegetal"}/><text x="580" y={index * 36 + 31} textAnchor="end" className="fill-foreground font-mono text-base">{number(row.score)}</text></g>)}
            </svg>}
            <p className="label-mono mt-3 text-muted-foreground">Fonte: conjunto didático local v1 · Dados simulados</p>
          </figure>
          <div className="mt-6 overflow-x-auto" role="region" aria-label="Dados e classificação simulados" tabIndex={0}>
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <caption className="sr-only">Entradas simuladas e resultado do índice por unidade fictícia</caption>
              <thead className="border-y border-foreground"><tr>{["Unidade", "Superfície (°C)", "Vegetação (%)", "Baixa renda (%)", "Índice (pontos)", "Prioridade"].map((heading) => <th key={heading} scope="col" className="px-2 py-3 font-medium first:pl-0">{heading}</th>)}</tr></thead>
              <tbody>{rows.map((row) => <tr key={row.id} className="border-b border-border"><th scope="row" className="py-3 font-mono font-normal">{row.id.toUpperCase()}</th><td className="px-2 py-3 font-mono">{number(row.temperature)}</td><td className="px-2 py-3 font-mono">{row.vegetation}</td><td className="px-2 py-3 font-mono">{row.lowIncome}</td><td className="px-2 py-3 font-mono">{number(row.score)}</td><td className="px-2 py-3">{row.priority}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="border-t border-foreground bg-paper-deep px-4 py-6" role="status" aria-live="polite" aria-atomic="true">
        <p className="label-mono text-terracotta">Recomendação hipotética · não é decisão de investimento</p>
        <p className="mt-3 leading-relaxed">{first ? `Com estes pesos, a unidade fictícia ${first.id.toUpperCase()} aparece primeiro (${number(first.score)} pontos). Uma hipótese de estudo seria avaliar arborização, percursos sombreados e espaços públicos de resfriamento nessa unidade, considerando acesso equitativo.` : "Defina ao menos um peso acima de zero para produzir uma comparação ilustrativa."}</p>
        <p className="mt-3 text-sm text-muted-foreground">Não há bairro identificado, intervenção executada ou redução de calor comprovada. Viabilidade, necessidades locais e prioridades devem ser validadas com profissionais e comunidades.</p>
      </div>
    </div>
  );
}