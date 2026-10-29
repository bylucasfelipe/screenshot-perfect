import { createFileRoute } from "@tanstack/react-router";
import { SectionStub } from "@/components/site/SectionStub";

export const Route = createFileRoute("/metodologia")({
  head: () => ({
    meta: [
      { title: "Metodologia — Termômetro Urbano" },
      { name: "description", content: "Fontes, tratamento de dados, métodos analíticos e limitações do Termômetro Urbano." },
      { property: "og:title", content: "Metodologia — Termômetro Urbano" },
      { property: "og:description", content: "Fontes, tratamento de dados, métodos e limitações." },
    ],
  }),
  component: () => (
    <SectionStub n="02" title="Metodologia" intro="De onde vêm os dados, como são tratados, quais métodos analíticos aplicamos e o que eles não conseguem dizer." />
  ),
});
