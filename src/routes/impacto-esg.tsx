import { createFileRoute } from "@tanstack/react-router";
import { DataNotes } from "@/components/site/DataNotes";
import { SustainableGoals } from "@/components/site/SustainableGoals";
import { esgDemonstrations } from "@/lib/observatory-data";

const number = (value: number) => value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export const Route = createFileRoute("/impacto-esg")({
  head: () => ({
    meta: [
      { title: "Impacto e ESG — Termômetro Urbano" },
      { name: "description", content: "Indicadores ESG com valores, linhas de base e metas fictícias para demonstração e relação educacional com os ODS 11, 13, 3 e 10." },
      { property: "og:title", content: "Impacto e ESG — Termômetro Urbano" },
      { property: "og:description", content: "Critérios de medição transparentes e relação com cidades sustentáveis, clima, saúde e equidade." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <section className="map-grid border-b border-foreground"><div className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-16"><p className="label-mono text-terracotta">Prancha 04 · Indicadores propostos</p><h1 className="mt-5 text-5xl md:text-7xl">Impacto e ESG</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed">Definir o que medir vem antes de afirmar o que mudou. Este é um quadro de avaliação proposto, não um relatório de resultados.</p></div></section>
      <DataNotes/>
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SustainableGoals />
        <section className="border-b border-foreground py-10"><p className="label-mono text-terracotta">Dados demonstrativos · valores fictícios</p><p className="mt-4 max-w-3xl leading-relaxed">Os seis indicadores abaixo apresentam valores simulados, com linhas de base e metas igualmente fictícias. Janelas 01, 02 e 03 são cenários sequenciais de demonstração, não datas reais. O indicador populacional usa o recorte térmico da janela 01, conforme seu cálculo. Não há operação real, empresas atendidas, intervenções avaliadas ou impactos comprovados; as metas não são compromissos aprovados.</p></section>
        {[
          { code: "E", title: "Ambiental", question: "Mudança na paisagem e no calor", indicators: [
            { name: "Cobertura vegetal", unit: "% da área", formula: "Área das classes vegetais definidas ÷ área válida do recorte × 100.", source: "MapBiomas: coleção, ano, classes e geometria documentados.", period: "Anual, em recorte territorial fixo.", limit: "Requer classes comparáveis e área sem dados reportada. Não mede acesso à sombra nem impacto de uma ação.", goal: "Avaliar manutenção ou ampliação da cobertura, após estabelecer linha de base." },
            { name: "Diferença térmica de superfície", unit: "°C", formula: "Média de superfície da área de estudo − média de uma referência comparável, no mesmo intervalo.", source: "Produto térmico de satélite a selecionar e validar; INMET não substitui essa medida.", period: "Datas e horários equivalentes; repetir em estação comparável.", limit: "Controlar nuvens, resolução e sazonalidade. Diferença térmica não é sensação térmica nem redução atribuível a intervenção.", goal: "Investigar redução da diferença térmica; sem compromisso numérico antes da validação." },
          ] },
          { code: "S", title: "Social", question: "Distribuição e acesso", indicators: [
            { name: "População em áreas de maior calor", unit: "% da população do recorte", formula: "População nos setores acima de limiar térmico pré-definido ÷ população total dos setores compatíveis × 100.", source: "IBGE Censo 2022 e camada térmica validada, com junção territorial documentada.", period: "Ano censitário e período térmico declarados separadamente.", limit: "Limiar ainda não definido. População residente não representa exposição diária ou risco individual.", goal: "Examinar desigualdades territoriais para orientar estudo, sem alegar pessoas beneficiadas." },
            { name: "Acesso territorial a áreas verdes públicas", unit: "% de residentes", formula: "População em áreas com acesso por rede de caminhada dentro de distância definida ÷ população do recorte × 100.", source: "IBGE e cadastro municipal validado de áreas verdes públicas, entradas e rede de caminhos.", period: "Atualização anual da rede, com referência censitária registrada.", limit: "Distância e critérios de acessibilidade ainda não definidos. Não equivale a uso, segurança ou qualidade do espaço.", goal: "Investigar lacunas de acesso e propor critérios de equidade, sem meta aprovada." },
          ] },
          { code: "G", title: "Governança", question: "Rastreabilidade e responsabilidade", indicators: [
            { name: "Completude da documentação", unit: "% de conjuntos utilizados", formula: "Conjuntos com fonte, licença, versão, período, escala e método completos ÷ total de conjuntos utilizados × 100.", source: "Inventário de dados e auditoria documental, ainda não realizados.", period: "A cada publicação da análise.", limit: "Documentação completa não certifica qualidade dos dados ou conformidade ESG. Sem conjuntos auditados, resultado indisponível.", goal: "Exigir documentação e revisão antes de futuras publicações; sem índice de desempenho medido." },
            { name: "Revisão humana de análises com IA", unit: "% de análises com IA", formula: "Análises com IA e revisão responsável registrada ÷ total de análises com IA × 100.", source: "Registro de modelo, instruções, saídas, verificação e aprovação, ainda não implementado.", period: "A cada versão e revisão periódica do registro.", limit: "Sem execução de IA na análise atual, indicador não aplicável; revisão não elimina todo erro ou viés.", goal: "Condicionar uso futuro de IA à revisão e transparência, não à divulgação automática." },
          ] },
        ].map((dimension) => <section key={dimension.code} className="editorial-section"><div><p className={`label-mono ${dimension.code === "E" ? "text-vegetal" : "text-terracotta"}`}>{dimension.code} · {dimension.title}</p><p className="mt-3 text-sm text-muted-foreground">{dimension.question}</p></div><div><h2 className="text-3xl md:text-4xl">{dimension.title}</h2><div className="mt-6 divide-y divide-foreground">{dimension.indicators.map((indicator) => { const demo = esgDemonstrations[indicator.name]; if (!demo) return null; const unit = dimension.code === "E" && indicator.name === "Diferença térmica de superfície" ? "°C" : "%"; return <article key={indicator.name} className="py-7 first:pt-0"><div className="flex flex-wrap items-baseline justify-between gap-3"><h3 className="text-2xl">{indicator.name}</h3><span className="label-mono text-muted-foreground">{number(demo.value)} {unit} · Simulado</span></div><dl className="mt-5 grid gap-x-6 gap-y-4 text-sm leading-relaxed sm:grid-cols-[130px_1fr]"><dt className="font-medium">Definição e cálculo</dt><dd>{indicator.formula}</dd><dt className="font-medium">Cálculo demonstrativo</dt><dd>{demo.calculation}</dd><dt className="font-medium">Fonte demonstrativa</dt><dd>Termômetro Urbano · cenários fictícios locais v1. {demo.method}</dd><dt className="font-medium">Fonte para estudo real</dt><dd>{indicator.source} Não utilizada para os valores fictícios.</dd><dt className="font-medium">Referência do exemplo</dt><dd>{indicator.name === "População em áreas de maior calor" ? "Recorte térmico da janela 01; base populacional hipotética fixa." : "Valor da janela 02; linha de base da janela 01; meta hipotética da janela 03."} Sem data de observação real.</dd><dt className="font-medium">Periodicidade proposta</dt><dd>{indicator.period}</dd><dt className="font-medium">Limitações</dt><dd>{demo.limit}</dd><dt className="font-medium text-vegetal">Intenção proposta</dt><dd>{indicator.goal}</dd><dt className="font-medium">Base / meta fictícias</dt><dd>{number(demo.baseline)} {unit} / {number(demo.target)} {unit} · Valores demonstrativos, não medidos nem aprovados.</dd></dl></article>; })}</div></div></section>)}
        <section className="py-12"><h2 className="text-3xl">Indicador não é impacto comprovado</h2><p className="mt-5 max-w-3xl leading-relaxed">Uma avaliação de impacto exige linha de base, intervenções documentadas, período comparável, controle de fatores externos e revisão independente. Este quadro não é certificação ESG nem comprovação de redução de calor, emissões ou desigualdade.</p></section>
      </div>
    </>
  ),
});
