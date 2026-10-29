export type DataNature = "simulated" | "public" | "estimate" | "target";
export type Landscape = "all" | "dense" | "mixed" | "green";
export type Metric = "temperature" | "vegetation";
export type Observation = {
  id: string;
  label: string;
  landscape: Exclude<Landscape, "all">;
  period: string;
  temperature: number;
  vegetation: number;
};

// Literal educational fixtures, not measurements or geographic territories.
export const observations: Observation[] = [
  { id: "a", label: "A — tecido adensado", landscape: "dense", period: "demo-1", temperature: 36.4, vegetation: 8 },
  { id: "b", label: "B — tecido adensado", landscape: "dense", period: "demo-1", temperature: 34.8, vegetation: 12 },
  { id: "c", label: "C — tecido misto", landscape: "mixed", period: "demo-1", temperature: 32.1, vegetation: 26 },
  { id: "d", label: "D — tecido misto", landscape: "mixed", period: "demo-1", temperature: 31.5, vegetation: 34 },
  { id: "e", label: "E — área arborizada", landscape: "green", period: "demo-1", temperature: 29.2, vegetation: 61 },
  { id: "f", label: "F — área arborizada", landscape: "green", period: "demo-1", temperature: 28.6, vegetation: 72 },
];

export const natureLabels: Record<DataNature, string> = {
  simulated: "Dados simulados",
  public: "Dados públicos reais",
  estimate: "Estimativas",
  target: "Metas propostas",
};

export function filterObservations(nature: DataNature, period: string, landscape: Landscape) {
  if (nature !== "simulated") return [];
  return observations.filter((row) => row.period === period && (landscape === "all" || row.landscape === landscape));
}

export function summarizeObservations(rows: Observation[]) {
  if (rows.length === 0) return { count: 0, temperature: null, vegetation: null };
  return {
    count: rows.length,
    temperature: rows.reduce((sum, row) => sum + row.temperature, 0) / rows.length,
    vegetation: rows.reduce((sum, row) => sum + row.vegetation, 0) / rows.length,
  };
}

export function observationCsv(rows: Observation[]) {
  const header = "id;unidade_ficticia;paisagem;periodo;temperatura_superficie_c;vegetacao_pct;natureza;fonte";
  return [header, ...rows.map((row) => [row.id, row.label, row.landscape, row.period, row.temperature, row.vegetation, "simulado", "Termômetro Urbano — conjunto didático v1"].join(";"))].join("\n");
}