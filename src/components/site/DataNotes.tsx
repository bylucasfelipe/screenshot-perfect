export function DataNotes() {
  return (
    <section aria-labelledby="natureza-title" className="border-y border-foreground bg-paper-deep">
      <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-8">
        <h2 id="natureza-title" className="text-2xl">Como ler a natureza dos dados</h2>
        <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div><dt className="label-mono text-terracotta">01 · Dados simulados</dt><dd className="mt-2 text-sm leading-relaxed">Valores fictícios para demonstrar a análise. Não descrevem bairros, pessoas ou medições de São Paulo.</dd></div>
          <div><dt className="label-mono">02 · Dados públicos reais</dt><dd className="mt-2 text-sm leading-relaxed">Registros com origem, data e localização verificáveis. As fontes estão referenciadas; nenhum conjunto real foi incorporado aqui.</dd></div>
          <div><dt className="label-mono">03 · Estimativas</dt><dd className="mt-2 text-sm leading-relaxed">Resultados de modelos, com hipóteses e incerteza. Não há estimativas calculadas ou validadas nesta versão.</dd></div>
          <div><dt className="label-mono text-vegetal">04 · Metas propostas</dt><dd className="mt-2 text-sm leading-relaxed">Intenções futuras, não resultados. Os indicadores ESG são propostas de medição, sem metas numéricas aprovadas.</dd></div>
        </dl>
      </div>
    </section>
  );
}