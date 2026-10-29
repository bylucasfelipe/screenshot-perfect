import { createFileRoute } from "@tanstack/react-router";
import { ObservatoryPanel } from "@/components/site/ObservatoryPanel";
import { DataNotes } from "@/components/site/DataNotes";

export const Route = createFileRoute("/observatorio")({
  head: () => ({
    meta: [
      { title: "Observatório — Termômetro Urbano" },
      { name: "description", content: "Comparações didáticas de temperatura de superfície e vegetação, com filtros, dados simulados e métodos explícitos. Não são medições territoriais reais." },
      { property: "og:title", content: "Observatório — Termômetro Urbano" },
      { property: "og:description", content: "Comparações de calor e vegetação com dados simulados, fontes e limitações explícitas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <section className="map-grid border-b border-foreground"><div className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-16"><div className="label-mono flex flex-wrap justify-between gap-4"><span className="text-terracotta">Prancha 01 · Dados simulados</span><span className="text-muted-foreground">23°33′S 46°38′O · referência da cidade</span></div><h1 className="mt-5 text-5xl md:text-7xl">Observatório</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed">Calor e vegetação, sob uma lente comparativa. Um conjunto didático para explorar a análise — não um diagnóstico dos territórios de São Paulo.</p></div></section>
      <ObservatoryPanel/>
      <DataNotes/>
    </>
  ),
});
