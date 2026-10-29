import { createFileRoute } from "@tanstack/react-router";
import { SectionStub } from "@/components/site/SectionStub";

export const Route = createFileRoute("/laboratorio-ia")({
  head: () => ({
    meta: [
      { title: "Laboratório de IA — Termômetro Urbano" },
      { name: "description", content: "Demonstração transparente do uso de inteligência artificial na análise de ilhas de calor." },
      { property: "og:title", content: "Laboratório de IA — Termômetro Urbano" },
      { property: "og:description", content: "Demonstração transparente do uso de IA na análise." },
    ],
  }),
  component: () => (
    <SectionStub n="03" title="Laboratório de IA" intro="Uma demonstração aberta de como a inteligência artificial apoia — sem substituir — a leitura dos dados territoriais." />
  ),
});
