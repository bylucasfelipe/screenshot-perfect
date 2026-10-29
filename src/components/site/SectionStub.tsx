import { Link } from "@tanstack/react-router";

export function SectionStub({ n, title, intro }: { n: string; title: string; intro: string }) {
  return (
    <section className="map-grid border-b border-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-32">
        <p className="label-mono text-terracotta">Prancha {n}</p>
        <h1 className="mt-4 max-w-4xl text-5xl leading-[0.95] md:text-8xl">{title}</h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        <p className="label-mono mt-12 inline-block border border-foreground px-3 py-2">
          Em desenvolvimento · próxima etapa
        </p>
        <div className="mt-8">
          <Link to="/" className="label-mono underline underline-offset-4 hover:text-terracotta">← Voltar à página inicial</Link>
        </div>
      </div>
    </section>
  );
}
