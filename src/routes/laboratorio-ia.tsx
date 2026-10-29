import { createFileRoute } from "@tanstack/react-router";
import { SectionStub } from "@/components/site/SectionStub";

export const Route = createFileRoute("/laboratorio-ia")({
  head: () => ({
    meta: [
      { title: "Laboratório de IA — Termômetro Urbano" },
      { name: "description", content: "Demonstração transparente do uso de inteligência artificial na análise de ilhas de calor." },
      { property: "og:title", content: "Laboratório de IA — Termômetro Urbano" },
      { property: "og:description", content: "Demonstração transparente do uso de IA na análise." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SectionStub n="03" title="Laboratório de IA" intro="Não há execução de IA, modelo treinado ou estimativas geradas nesta versão. O papel proposto da IA, seus limites e os requisitos de revisão humana estão descritos na Metodologia." />
  ),
});
