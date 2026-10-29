import { createFileRoute } from "@tanstack/react-router";
import { SectionStub } from "@/components/site/SectionStub";

export const Route = createFileRoute("/observatorio")({
  head: () => ({
    meta: [
      { title: "Observatório — Termômetro Urbano" },
      { name: "description", content: "Visualizações territoriais de calor e vegetação em São Paulo, com dados simulados." },
      { property: "og:title", content: "Observatório — Termômetro Urbano" },
      { property: "og:description", content: "Visualizações territoriais de calor e vegetação em São Paulo." },
    ],
  }),
  component: () => (
    <SectionStub n="01" title="Observatório" intro="Visualizações territoriais de temperatura de superfície e cobertura vegetal, com legendas, escalas e fontes identificáveis." />
  ),
});
