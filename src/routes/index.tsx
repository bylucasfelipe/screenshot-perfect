import { createFileRoute, Link } from "@tanstack/react-router";
import { HeatMap } from "@/components/site/HeatMap";
import { sections } from "@/components/site/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Termômetro Urbano — Inteligência climática para São Paulo" },
      { name: "description", content: "Observatório educacional sobre ilhas de calor urbanas em São Paulo: dados, metodologia, IA e indicadores ESG." },
      { property: "og:title", content: "Termômetro Urbano — A cidade não esquenta por igual" },
      { property: "og:description", content: "Observatório educacional sobre ilhas de calor urbanas em São Paulo." },
    ],
  }),
  component: Index,
});

function ThermalProfile() {
  // Corte ilustrativo: centro denso → periferia arborizada. Sem valores reais.
  const pts = "0,40 60,38 120,30 180,18 240,10 300,8 360,12 420,22 480,34 540,46 600,52 660,56 720,58";
  return (
    <figure>
      <svg viewBox="0 0 720 200" className="w-full" role="img" aria-labelledby="perfil-t">
        <title id="perfil-t">Perfil térmico ilustrativo: temperatura mais alta no centro adensado e mais baixa nas áreas arborizadas</title>
        <polyline points={pts.split(" ").map((p) => { const [x, y] = p.split(","); return `${x},${+y + 20}`; }).join(" ")} fill="none" className="stroke-terracotta" strokeWidth="2.5" />
        {/* edifícios */}
        {Array.from({ length: 24 }).map((_, i) => {
          const x = i * 30 + 4;
          const center = Math.max(0, 1 - Math.abs(i - 9) / 10);
          const h = 14 + center * 70;
          const tree = i > 16;
          return tree ? (
            <circle key={i} cx={x + 11} cy={182 - 14} r={12} className="fill-vegetal" />
          ) : (
            <rect key={i} x={x} y={182 - h} width={22} height={h} className="fill-none stroke-charcoal" strokeWidth="1" />
          );
        })}
        <line x1="0" y1="182" x2="720" y2="182" className="stroke-charcoal" strokeWidth="1.2" />
      </svg>
      <figcaption className="label-mono mt-3 flex flex-wrap justify-between gap-2 text-muted-foreground">
        <span>Centro adensado</span>
        <span>Fig. 02 — Perfil térmico <span className="text-terracotta">ilustrativo</span>, sem escala de valores</span>
        <span>Periferia arborizada</span>
      </figcaption>
    </figure>
  );
}

function Index() {
  return (
    <>
      {/* Abertura */}
      <section className="map-grid border-b border-foreground">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-14 md:px-8 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div className="flex flex-col justify-between gap-10">
            <p className="label-mono inline-flex w-fit border border-terracotta px-2.5 py-1.5 text-terracotta">
              Projeto educacional · Dados simulados
            </p>
            <h1 className="text-6xl leading-[0.92] font-medium md:text-8xl xl:text-[8.5rem]">
              A cidade não esquenta <em className="text-terracotta">por igual.</em>
            </h1>
            <div className="grid gap-8 border-t border-foreground pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-md text-lg leading-relaxed">
                Um observatório para ler o calor urbano de São Paulo território a território — e entender onde a adaptação é mais urgente.
              </p>
              <Link to="/observatorio" className="label-mono inline-flex items-center gap-3 bg-primary px-5 py-3.5 text-primary-foreground transition-colors hover:bg-terracotta">
                Abrir o observatório →
              </Link>
            </div>
          </div>
          <div className="lg:pl-8">
            <HeatMap />
          </div>
        </div>
      </section>

      {/* O problema */}
      <section className="border-b border-foreground">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 md:px-8 lg:grid-cols-[200px_1fr_260px]">
          <p className="label-mono text-terracotta">§ 1 — O problema</p>
          <div>
            <h2 className="text-4xl leading-tight md:text-5xl">Asfalto, concreto e pouca sombra acumulam calor — e devolvem à noite.</h2>
            <div className="mt-8 gap-10 text-base leading-relaxed md:columns-2">
              <p>
                Ilhas de calor são áreas urbanas que permanecem mais quentes que o entorno. Superfícies impermeáveis absorvem radiação solar durante o dia, a falta de vegetação reduz o resfriamento por evapotranspiração e a geometria dos edifícios dificulta a dissipação.
              </p>
              <p className="mt-4 md:mt-0">
                O efeito não se distribui de forma neutra: costuma se sobrepor a desigualdades de moradia, renda e acesso a áreas verdes. Cruzar dados ambientais e socioeconômicos ajuda a identificar onde ações de adaptação podem ter maior relevância.
              </p>
            </div>
          </div>
          <aside className="border-l border-foreground pl-5 text-sm text-muted-foreground">
            <p className="label-mono text-foreground">Nota de margem</p>
            <p className="mt-3">
              Neste projeto, as fontes de referência indicam de onde dados reais poderiam vir — INMET (temperatura), IBGE (censo), MapBiomas (cobertura do solo). Os números exibidos são simulados.
            </p>
          </aside>
        </div>
      </section>

      {/* Perfil térmico */}
      <section className="border-b border-foreground bg-paper-deep">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8">
          <div className="mb-10 grid gap-6 lg:grid-cols-[200px_1fr]">
            <p className="label-mono text-terracotta">§ 2 — Corte transversal</p>
            <h2 className="max-w-3xl text-4xl leading-tight md:text-5xl">Atravesse a cidade e a curva muda com a paisagem.</h2>
          </div>
          <ThermalProfile />
        </div>
      </section>

      {/* Entrada do observatório */}
      <section className="map-grid-dark bg-charcoal text-paper">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:px-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="label-mono text-ochre">§ 3 — Índice das pranchas</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-6xl">Quatro modos de olhar o mesmo calor.</h2>
            <div className="mt-10 max-w-[220px] opacity-90"><HeatMap compact /></div>
          </div>
          <ol className="divide-y divide-paper/20 border-y border-paper/20">
            {sections.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className="group grid grid-cols-[48px_1fr_auto] items-baseline gap-4 py-7">
                  <span className="label-mono text-ochre">{s.n}</span>
                  <span>
                    <span className="block font-display text-3xl transition-colors group-hover:text-ochre md:text-4xl">{s.label}</span>
                    <span className="mt-2 block text-sm text-paper/70">{s.desc}</span>
                  </span>
                  <span className="label-mono text-paper/60 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
