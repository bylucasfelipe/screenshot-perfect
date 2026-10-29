import { createFileRoute } from "@tanstack/react-router";
import { SectionStub } from "@/components/site/SectionStub";

export const Route = createFileRoute("/impacto-esg")({
  head: () => ({
    meta: [
      { title: "Impacto e ESG — Termômetro Urbano" },
      { name: "description", content: "Indicadores ambientais, sociais e de governança com períodos de referência e critérios de medição." },
      { property: "og:title", content: "Impacto e ESG — Termômetro Urbano" },
      { property: "og:description", content: "Indicadores ESG com critérios de medição transparentes." },
    ],
  }),
  component: () => (
    <SectionStub n="04" title="Impacto e ESG" intro="Indicadores ambientais, sociais e de governança, sempre acompanhados de período de referência e critério de medição." />
  ),
});
