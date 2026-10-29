import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const sections = [
  { n: "01", to: "/observatorio", label: "Observatório", desc: "Calor de superfície e cobertura vegetal por território." },
  { n: "02", to: "/metodologia", label: "Metodologia", desc: "Fontes, tratamento de dados, métodos e limitações." },
  { n: "03", to: "/laboratorio-ia", label: "Laboratório de IA", desc: "Como a IA entra — e onde ela não entra — na análise." },
  { n: "04", to: "/impacto-esg", label: "Impacto e ESG", desc: "Indicadores, períodos de referência e critérios de medição." },
] as const;

function Mark() {
  return (
    <svg width="14" height="28" viewBox="0 0 14 28" aria-hidden="true" className="text-foreground">
      <rect x="4.5" y="1" width="5" height="18" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="7" cy="22" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <line x1="7" y1="10" x2="7" y2="22" className="stroke-terracotta" strokeWidth="2" />
      <circle cx="7" cy="22" r="2.4" className="fill-terracotta" />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-foreground bg-background">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-6 px-5 md:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Mark />
          <span className="font-display text-lg font-semibold tracking-tight">Termômetro Urbano</span>
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {sections.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className="label-mono text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-terracotta" }}>
                  <span className="mr-1.5 text-terracotta">{s.n}</span>{s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <span className="label-mono hidden text-muted-foreground xl:block">23°33′S 46°38′O</span>
        <button
          type="button"
          className="label-mono border border-foreground px-3 py-1.5 lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movel"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="menu-movel" aria-label="Principal" className="map-grid fixed inset-x-0 top-14 bottom-0 bg-background px-5 py-8 lg:hidden">
          <ul className="divide-y divide-border border-y border-border">
            {sections.map((s) => (
              <li key={s.to}>
                <Link to={s.to} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-5">
                  <span className="label-mono text-terracotta">{s.n}</span>
                  <span className="font-display text-3xl">{s.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="label-mono mt-8 text-muted-foreground">23°33′S 46°38′O · São Paulo</p>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-12 md:grid-cols-3 md:px-8">
        <div>
          <p className="label-mono text-terracotta">Colofão</p>
          <p className="mt-3 font-display text-xl">Termômetro Urbano</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Organização fictícia. Projeto educacional e demonstrativo, sem clientes, resultados ou operações reais.
          </p>
        </div>
        <div>
          <p className="label-mono text-muted-foreground">Dados</p>
          <p className="mt-3 text-sm">
            Todas as visualizações deste site usam dados simulados, identificados como tal. Fontes públicas de referência:
            INMET, IBGE, MapBiomas, GeoSampa.
          </p>
        </div>
        <div>
          <p className="label-mono text-muted-foreground">Tipografia</p>
          <p className="mt-3 text-sm">Fraunces · IBM Plex Sans · IBM Plex Mono</p>
          <p className="label-mono mt-6 text-muted-foreground">Prancha 00 · São Paulo · 2026</p>
        </div>
      </div>
    </footer>
  );
}
