import { useId, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ExplorationMap } from "@/components/site/ExplorationMap";
import { exploreObservations, intensityBands, metricDetails, natureLabels, observationCsv, type DataNature, type Intensity, type Landscape, type Metric, type Observation } from "@/lib/observatory-data";

const format = (value: number) => value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const selectClass = "mt-2 min-h-11 w-full border border-foreground bg-background px-3 text-sm text-foreground";
const emptyCopy: Record<DataNature, string> = {
  simulated: "Não há registros simulados para esta seleção. O conjunto didático contém as janelas demonstrativas 01 e 02.",
  public: "Nenhum conjunto público real foi incorporado. Consulte as fontes e os critérios de validação na metodologia.",
  estimate: "Não há modelo calibrado nem estimativas validadas. Valores simulados não são estimativas de condições reais.",
  target: "Metas não são observações. Consulte as propostas de indicadores em Impacto e ESG; não há metas numéricas aprovadas.",
};

function ComparisonChart({ rows, metric, selectedId, onSelect }: { rows: Observation[]; metric: Metric; selectedId?: string; onSelect: (id: string) => void }) {
  const id = useId();
  const temperature = metric === "temperature";
  const unit = temperature ? "°C" : "%";
  const max = temperature ? 40 : 100;
  const heading = temperature ? "Temperatura de superfície" : "Cobertura vegetal";
  const windowLabel = rows[0]?.period === "demo-2" ? "02" : "01";
  return (
    <figure aria-labelledby={`${id}-heading`}>
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-foreground pb-4">
        <h2 id={`${id}-heading`} className="text-3xl md:text-4xl">{heading}</h2>
        <p className="label-mono text-terracotta">{unit} · Dados simulados</p>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Unidades fictícias A–F · janela demonstrativa {windowLabel}, sem data de observação real.</p>
      <svg viewBox={`0 0 640 ${60 + rows.length * 56}`} className="mt-6 hidden w-full sm:block" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{`${heading} por unidade fictícia, em ${unit}`}</title>
        <desc id={`${id}-desc`}>{`${rows.map((row) => `${row.label}: ${format(row[metric])} ${unit}`).join("; ")}. Valores didáticos, não medições. Eixo de zero a ${max} ${unit}. Os mesmos valores estão na tabela a seguir.`}</desc>
        {[0, 1, 2, 3, 4].map((tick) => <g key={tick} className="stroke-border fill-charcoal"><line x1={210 + tick * 90} x2={210 + tick * 90} y1="12" y2={rows.length * 56 + 18} /><text x={210 + tick * 90} y={rows.length * 56 + 44} textAnchor="middle" stroke="none" fontSize="12" className="font-mono">{max * tick / 4} {unit}</text></g>)}
        {rows.map((row, index) => <g key={row.id}>
          <title>{`${row.label}: ${format(row[metric])} ${unit}. Janela ${windowLabel} · Dados simulados${row.id === selectedId ? " · Unidade selecionada" : ""}`}</title>
          {row.id === selectedId && <rect x="0" y={index * 56 + 10} width="630" height="42" className="fill-none stroke-foreground" strokeWidth="2" />}
          <text x="0" y={index * 56 + 37} className="fill-charcoal" fontSize="14">{row.label}</text>
          <rect x="210" y={index * 56 + 18} width={row[metric] / max * 360} height="26" className={temperature ? "fill-terracotta" : "fill-vegetal"} />
          <text x={218 + row[metric] / max * 360} y={index * 56 + 36} className="fill-charcoal font-mono" fontSize="12">{format(row[metric])}</text>
        </g>)}
      </svg>
      <ol className="mt-6 space-y-5 sm:hidden" aria-label={`${heading}: valores em ${unit}`}>
        {rows.map((row) => <li key={row.id}>
          <div className="flex flex-wrap justify-between gap-2 text-sm"><Button variant="link" aria-pressed={row.id === selectedId} className="h-auto min-h-11 justify-start whitespace-normal p-0 text-left" onClick={() => onSelect(row.id)}>{row.id === selectedId ? "✓ " : ""}{row.label}</Button><span className="font-mono">{format(row[metric])} {unit}</span></div>
          <svg viewBox="0 0 100 5" preserveAspectRatio="none" className="mt-2 h-3 w-full" aria-hidden="true"><rect width="100" height="5" className="fill-paper-deep"/><rect width={row[metric] / max * 100} height="5" className={temperature ? "fill-terracotta" : "fill-vegetal"}/></svg>
        </li>)}
      </ol>
      <figcaption className="mt-6 space-y-3 border-t border-foreground pt-4 text-sm leading-relaxed">
        <p><span className={`mr-2 inline-block h-2.5 w-6 ${temperature ? "bg-terracotta" : "bg-vegetal"}`} aria-hidden="true"/><strong>Legenda:</strong> comprimento da barra = {heading.toLowerCase()}; escala fixa de 0 a {max} {unit}, sem localização geográfica. Contorno = unidade selecionada.</p>
        <p><strong>Fonte:</strong> Termômetro Urbano · conjunto didático v1, seis unidades fictícias por janela. INMET, IBGE e MapBiomas não são a origem destes valores.</p>
        <p><strong>Método:</strong> valores definidos manualmente para contrastar tipos de paisagem; não resultam de sensores, satélites ou IA. A seleção apenas filtra os registros, sem interpolação.</p>
        <p><strong>Leitura:</strong> {temperature ? "A variação do conjunto ilustra diferenças térmicas possíveis; não mede ilha de calor real nem temperatura do ar." : "A proporção vegetal é fictícia; não foi classificada por imagem e não representa área verde disponível por pessoa."} A comparação não demonstra causalidade.</p>
      </figcaption>
    </figure>
  );
}

export function ObservatoryPanel() {
  const [nature, setNature] = useState<DataNature>("simulated");
  const [period, setPeriod] = useState("demo-1");
  const [landscape, setLandscape] = useState<Landscape>("all");
  const [metric, setMetric] = useState<Metric>("temperature");
  const [intensity, setIntensity] = useState<Intensity>("all");
  const [region, setRegion] = useState("all");
  const { mapRows, rows, selected, summary, reference, difference, periodDifference } = exploreObservations(nature, period, landscape, metric, intensity, region);
  const unit = metricDetails[metric].unit;
  const selectRegion = (id: string) => setRegion((previous) => previous === id ? "all" : id);
  const signed = (value: number) => `${value > 0 ? "+" : ""}${format(value)}`;
  const reset = () => { setNature("simulated"); setPeriod("demo-1"); setLandscape("all"); setMetric("temperature"); setIntensity("all"); setRegion("all"); };
  const download = () => {
    if (!rows.length) return;
    const url = URL.createObjectURL(new Blob(["\uFEFF" + observationCsv(rows)], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "termometro-urbano-simulado.csv"; a.click(); URL.revokeObjectURL(url);
  };
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-8">
      <form aria-label="Filtros do observatório" onSubmit={(event) => event.preventDefault()} className="grid gap-5 border-b border-foreground pb-8 sm:grid-cols-2 lg:grid-cols-3 lg:items-end">
        <label className="label-mono" htmlFor="natureza">Natureza dos dados<select id="natureza" className={selectClass} value={nature} onChange={(event) => { setNature(event.target.value as DataNature); setRegion("all"); }}>{Object.entries(natureLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label className="label-mono" htmlFor="periodo">Período<select id="periodo" className={selectClass} value={period} onChange={(event) => setPeriod(event.target.value)}><option value="demo-1">Janela demonstrativa 01</option><option value="demo-2">Janela demonstrativa 02</option></select></label>
        <label className="label-mono" htmlFor="paisagem">Tipo de paisagem<select id="paisagem" className={selectClass} value={landscape} onChange={(event) => { setLandscape(event.target.value as Landscape); setRegion("all"); }}><option value="all">Todas as paisagens</option><option value="dense">Tecido adensado</option><option value="mixed">Tecido misto</option><option value="green">Área arborizada</option></select></label>
        <label className="label-mono" htmlFor="indicador">Indicador<select id="indicador" className={selectClass} value={metric} onChange={(event) => { setMetric(event.target.value as Metric); setRegion("all"); }}>{Object.entries(metricDetails).map(([key, detail]) => <option key={key} value={key}>{detail.label} · {detail.unit}</option>)}</select></label>
        <label className="label-mono" htmlFor="regiao">Região ilustrativa<select id="regiao" className={selectClass} value={selected?.id ?? "all"} onChange={(event) => setRegion(event.target.value)}><option value="all">Todas as unidades</option>{rows.map((row) => <option key={row.id} value={row.id}>{row.label}</option>)}</select></label>
        <label className="label-mono" htmlFor="intensidade">Intensidade<select id="intensidade" className={selectClass} value={intensity} onChange={(event) => { setIntensity(event.target.value as Intensity); setRegion("all"); }}><option value="all">Todas as faixas</option>{intensityBands[metric].map((band) => <option key={band.id} value={band.id}>{band.label}</option>)}</select></label>
        <Button type="button" variant="outline" className="min-h-11 shadow-none" onClick={reset}>Restaurar seleção</Button>
      </form>
      <div role="status" aria-live="polite" aria-atomic="true" className="label-mono mt-6 text-muted-foreground">{natureLabels[nature]} · {rows.length} unidades fictícias nos filtros{selected ? ` · Unidade ${selected.id.toUpperCase()} selecionada` : ""} · {period === "demo-1" ? "janela 01" : "janela 02"}</div>
      <dl className="my-8 grid gap-6 border-b border-foreground pb-8 sm:grid-cols-3">
        <div><dt className="label-mono">Unidades na seleção</dt><dd className="mt-3 font-display text-5xl">{summary.count}</dd><dd className="mt-2 text-sm text-muted-foreground">Contagem de registros; não bairros.</dd></div>
        <div><dt className="label-mono">Superfície · média simples</dt><dd className="mt-3 font-display text-5xl">{summary.temperature === null ? "—" : format(summary.temperature)} <span className="text-2xl">°C</span></dd><dd className="mt-2 text-sm text-muted-foreground">Simulada; {selected ? "valor da unidade selecionada." : "sem ponderação por área."}</dd></div>
        <div><dt className="label-mono">Vegetação · média simples</dt><dd className="mt-3 font-display text-5xl">{summary.vegetation === null ? "—" : format(summary.vegetation)} <span className="text-2xl">%</span></dd><dd className="mt-2 text-sm text-muted-foreground">Simulada; {selected ? "valor da unidade selecionada." : "não é o total municipal."}</dd></div>
      </dl>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Fonte e cálculo dos indicadores:</strong> conjunto didático v1; soma dos valores filtrados dividida pela contagem de registros. Com uma unidade selecionada, os indicadores exibem seus valores; gráfico e tabela mantêm as demais unidades para comparação. Sem registros, as médias ficam indisponíveis (—), nunca iguais a zero.</p>
      {mapRows.length > 0 && <ExplorationMap mapRows={mapRows} rows={rows} metric={metric} selectedId={selected?.id} onSelect={selectRegion} />}
      {selected && <section aria-labelledby="selected-title" className="mb-10 border-l-2 border-terracotta pl-5" role="status" aria-live="polite">
        <p className="label-mono text-terracotta">Unidade selecionada · Dados simulados</p><h2 id="selected-title" className="mt-3 text-3xl">{selected.label}</h2>
        <p className="mt-3 leading-relaxed">{metricDetails[metric].label}: <strong>{format(selected[metric])} {unit}</strong>. {difference !== null && reference[metric] !== null ? <>Diferença em relação à média das seis unidades nesta janela ({format(reference[metric])} {unit}): <strong>{signed(difference)} {metric === "vegetation" ? "pontos percentuais" : unit}</strong>.</> : null}</p>
        <p className="mt-3 text-sm leading-relaxed">{difference === 0 ? "Mesmo valor que a referência geral." : difference !== null && difference > 0 ? "Valor acima da referência geral deste cenário." : "Valor abaixo da referência geral deste cenário."} {periodDifference !== null ? `Variação da janela 01 para 02: ${signed(periodDifference)} ${metric === "vegetation" ? "pontos percentuais" : unit}.` : "A janela 01 é a referência inicial, sem cenário anterior."} Não representa risco, previsão ou efeito comprovado.</p>
        <Button variant="outline" className="mt-4 min-h-11 shadow-none" onClick={() => setRegion("all")}>Voltar à visão geral</Button>
      </section>}
      {rows.length ? <>
        <fieldset className="mb-8"><legend className="label-mono mb-3">Variável da comparação</legend><div className="inline-flex flex-wrap gap-2"><label className="flex min-h-11 cursor-pointer items-center gap-2 border border-foreground px-3 text-sm"><input type="radio" name="metric" value="temperature" checked={metric === "temperature"} onChange={() => { setMetric("temperature"); setRegion("all"); }} className="accent-terracotta"/>Temperatura · °C</label><label className="flex min-h-11 cursor-pointer items-center gap-2 border border-foreground px-3 text-sm"><input type="radio" name="metric" value="vegetation" checked={metric === "vegetation"} onChange={() => { setMetric("vegetation"); setRegion("all"); }} className="accent-vegetal"/>Vegetação · %</label></div></fieldset>
        <ComparisonChart rows={rows} metric={metric} selectedId={selected?.id} onSelect={selectRegion}/>
        <section aria-labelledby="table-title" className="mt-12 border-t border-foreground pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4"><h2 id="table-title" className="text-3xl">Registros da seleção</h2><Button variant="outline" className="min-h-11 shadow-none" onClick={download}>Baixar CSV simulado</Button></div>
          <div className="mt-5 overflow-x-auto" role="region" aria-label="Tabela de registros simulados" tabIndex={0}>
            <table className="w-full min-w-[520px] text-left text-sm"><caption className="pb-4 text-left text-muted-foreground">Dados simulados · janela {period === "demo-2" ? "02" : "01"} · Fonte: conjunto didático v1. Mesmos registros do gráfico.</caption><thead className="border-y border-foreground"><tr><th scope="col" className="py-3 pr-4">Unidade fictícia</th><th scope="col" className="py-3 pr-4">Superfície (°C)</th><th scope="col" className="py-3">Vegetação (%)</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id} aria-selected={selected?.id === row.id} className={`border-b border-border ${selected?.id === row.id ? "bg-paper-deep" : ""}`}><th scope="row" className="py-4 pr-4 font-normal"><Button variant="link" className="h-auto min-h-11 p-0" aria-pressed={selected?.id === row.id} onClick={() => selectRegion(row.id)}>{selected?.id === row.id ? "✓ " : ""}{row.label}</Button></th><td className="font-mono">{format(row.temperature)}</td><td className="font-mono">{format(row.vegetation)}</td></tr>)}</tbody></table>
          </div>
        </section>
      </> : <section aria-labelledby="empty-title" className="border-y border-foreground py-12"><p className="label-mono text-terracotta">Sem dados para esta seleção</p><h2 id="empty-title" className="mt-3 text-3xl">Nenhum registro disponível</h2><p className="mt-4 max-w-2xl leading-relaxed">{nature === "simulated" ? "Nenhuma unidade corresponde à paisagem e faixa de intensidade escolhidas. Altere os filtros ou restaure a seleção." : emptyCopy[nature]}</p><div className="mt-6 flex flex-wrap items-center gap-5"><Button onClick={reset} className="min-h-11 shadow-none">Voltar ao conjunto simulado</Button><Link to={nature === "target" ? "/impacto-esg" : "/metodologia"} className="underline underline-offset-4">{nature === "target" ? "Ver indicadores propostos" : "Consultar metodologia"}</Link></div></section>}
      <aside className="mt-10 border-l border-terracotta pl-5"><h2 className="text-2xl">Território não é esquema</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed">Não há mapa territorial nesta versão. As unidades A–F não têm coordenadas e não representam distritos. Os desenhos desta análise e da página inicial são esquemas conceituais, não uma delimitação geográfica de São Paulo. Mapas territoriais só serão publicados com geometria, localização, período e fonte verificáveis.</p></aside>
    </div>
  );
}