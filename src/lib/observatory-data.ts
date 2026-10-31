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

// A second manually authored scenario; the original six records remain unchanged.
export const secondWindowObservations: Observation[] = observations.map((row, index) => ({
  ...row,
  period: "demo-2",
  temperature: [35.6, 34.1, 31.6, 31.0, 28.9, 28.2][index] ?? row.temperature,
  vegetation: [10, 14, 29, 37, 64, 75][index] ?? row.vegetation,
}));

const demoMean = (rows: Observation[], metric: Metric) => rows.reduce((sum, row) => sum + row[metric], 0) / rows.length;
const simulatedPopulation = [1200, 1000, 1100, 1000, 900, 800];
const hotterPopulation = observations.reduce((sum, row, index) => sum + (row.temperature > 34 ? simulatedPopulation[index] ?? 0 : 0), 0);

// All baselines, goals, populations, inventories and review cases below are fictional.
// Windows 01–02–03 are sequential scenarios, not observation dates or commitments.
export const esgDemonstrations: Record<string, { baseline: number; value: number; target: number; calculation: string; method: string; limit: string }> = {
  "Cobertura vegetal": { baseline: demoMean(observations, "vegetation"), value: demoMean(secondWindowObservations, "vegetation"), target: 40, calculation: "229 ha vegetais ÷ 600 ha fictícios × 100 = 38,2% (apresentação arredondada).", method: "Seis unidades com 100 ha fictícios cada; janela 01: 213 ha vegetais; janela 02: 229 ha. A média coincide com o Observatório por terem áreas iguais neste exercício.", limit: "Áreas e cobertura são fictícias. Não mede acesso à sombra, uso de parques ou efeito de uma intervenção." },
  "Diferença térmica de superfície": { baseline: demoMean(observations, "temperature") - 28.9, value: demoMean(secondWindowObservations, "temperature") - 28.9, target: 2.5, calculation: "31,5667 °C − 28,9 °C de referência fixa fictícia = 2,7 °C (arredondado).", method: "Média simples das seis unidades, comparada à referência didática fixa de 28,9 °C nas duas janelas. Janela 01: 32,1 − 28,9 = 3,2 °C.", limit: "Referência e temperaturas simuladas, sem datas ou horários reais. A diferença entre cenários não prova redução de calor causada por uma ação." },
  "População em áreas de maior calor": { baseline: 40, value: hotterPopulation / 6000 * 100, target: 30, calculation: "2.200 residentes fictícios ÷ 6.000 × 100 = 36,7% (arredondado).", method: "Recorte térmico da janela 01: limiar didático > 34 °C, unidades A e B. Populações fictícias A–F: 1.200, 1.000, 1.100, 1.000, 900 e 800. Linha de base ilustrativa: 2.400 de 6.000.", limit: "Não são habitantes reais, dados censitários ou risco individual. O limiar de 34 °C é apenas uma convenção deste exemplo." },
  "Acesso territorial a áreas verdes públicas": { baseline: 50, value: 55, target: 60, calculation: "3.300 residentes fictícios com acesso ÷ 6.000 × 100 = 55,0%.", method: "Acesso hipotético por caminhada de até 500 m; janela 01: 3.000 de 6.000; janela 02: 3.300 de 6.000. Distâncias e acesso foram definidos manualmente, sem rede geográfica.", limit: "Não há parques, entradas ou trajetos reais cadastrados. O exemplo não avalia qualidade, segurança, acessibilidade física ou uso dos espaços." },
  "Completude da documentação": { baseline: 80, value: 90, target: 100, calculation: "9 conjuntos fictícios completos ÷ 10 conjuntos fictícios × 100 = 90,0%.", method: "Inventário demonstrativo separado dos seis registros do Observatório. Completo exige fonte fictícia, licença de exemplo, versão, período, escala e método. Janela 01: 8 de 10; janela 02: 9 de 10.", limit: "Inventário e auditoria inteiramente fictícios; não é documentação auditada do projeto ou certificação de qualidade e conformidade ESG." },
  "Revisão humana de análises com IA": { baseline: 50, value: 75, target: 100, calculation: "6 casos fictícios revisados ÷ 8 casos fictícios × 100 = 75,0%.", method: "Oito casos de uso de IA imaginados para este exercício: janela 01, 4 revisados; janela 02, 6 revisados. Não houve execução de IA nem revisão operacional real.", limit: "Percentual exclusivamente demonstrativo. Não descreve análises realizadas pelo projeto; mesmo uma revisão real não eliminaria todos os erros ou vieses." },
};

export const natureLabels: Record<DataNature, string> = {
  simulated: "Dados simulados",
  public: "Dados públicos reais",
  estimate: "Estimativas",
  target: "Metas propostas",
};

export function filterObservations(nature: DataNature, period: string, landscape: Landscape) {
  if (nature !== "simulated") return [];
  return [...observations, ...secondWindowObservations].filter((row) => row.period === period && (landscape === "all" || row.landscape === landscape));
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