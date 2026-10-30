const central = [
  { n: "11", name: "Cidades e Comunidades Sustentáveis", description: "Tornar as cidades e os assentamentos humanos inclusivos, seguros, resilientes e sustentáveis.", relation: "O estudo de calor e vegetação pode apoiar discussões sobre planejamento urbano, espaços públicos sombreados e adaptação dos territórios. Aqui, esse vínculo é demonstrado com unidades fictícias, sem intervenções realizadas." },
  { n: "13", name: "Ação Contra a Mudança Global do Clima", description: "Tomar medidas urgentes para combater a mudança climática e seus impactos.", relation: "A leitura de padrões térmicos ajuda a discutir adaptação ao calor e resiliência urbana. A demonstração não mede emissões, não atribui episódios de calor à mudança climática e não comprova mitigação." },
];
const related = [
  { n: "3", name: "Saúde e Bem-Estar", description: "Assegurar uma vida saudável e promover o bem-estar para todas e todos, em todas as idades.", relation: "O calor urbano é relevante para debates de saúde e acesso a ambientes protegidos. Temperatura de superfície simulada não mede exposição individual, risco clínico ou benefícios à saúde." },
  { n: "10", name: "Redução das Desigualdades", description: "Reduzir a desigualdade dentro dos países e entre eles.", relation: "Cruzar calor, vegetação e contexto socioeconômico permite discutir distribuição desigual de condições urbanas e acesso à adaptação. Os exemplos não representam grupos reais nem comprovam redução de desigualdades." },
];

export function SustainableGoals() {
  return <section className="editorial-section" aria-labelledby="ods-title">
    <div><p className="label-mono text-vegetal">Agenda 2030 · ODS</p><p className="mt-3 text-sm text-muted-foreground">Relação temática, não certificação ou impacto medido.</p></div>
    <div className="min-w-0"><h2 id="ods-title" className="text-3xl md:text-4xl">Objetivos de Desenvolvimento Sustentável</h2><p className="mt-5 leading-relaxed">Quatro objetivos orientam a discussão educacional do Termômetro Urbano. Cidades sustentáveis e ação climática são centrais; saúde e equidade atravessam seus impactos sociais.</p>
      {[{ label: "Objetivos centrais", goals: central }, { label: "Objetivos relacionados · saúde e impactos sociais", goals: related }].map((group, index) => <div key={group.label} className="mt-8"><p className={`label-mono border-b border-foreground pb-3 ${index === 0 ? "text-terracotta" : "text-vegetal"}`}>{group.label}</p><div className="grid gap-x-8 sm:grid-cols-2">{group.goals.map((goal) => <article key={goal.n} className="border-b border-border py-6"><p className={`font-mono ${index === 0 ? "text-4xl text-terracotta" : "text-2xl text-vegetal"}`}>ODS {goal.n}</p><h3 className="mt-3 text-2xl">{goal.name}</h3><p className="mt-4 text-sm leading-relaxed">{goal.description}</p><p className="mt-4 text-sm leading-relaxed"><strong>Relação com o projeto: </strong>{goal.relation}</p></article>)}</div></div>)}
      <p className="mt-6 text-sm text-muted-foreground">Referência: <a href="https://brasil.un.org/pt-br/sdgs" className="underline underline-offset-4">Nações Unidas no Brasil · Objetivos de Desenvolvimento Sustentável</a>. A relação apresentada não constitui endosso da ONU, cumprimento de metas ou avaliação oficial.</p>
    </div>
  </section>;
}