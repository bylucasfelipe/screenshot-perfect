import { describe, expect, it } from "vitest";
import { filterObservations, observationCsv, summarizeObservations } from "@/lib/observatory-data";

describe("Analytical provenance and coherent filters", () => {
  it("never passes simulated rows as public real data", () => { expect(filterObservations("public", "demo-1", "all")).toEqual([]); });
  it("never passes simulated rows as estimates", () => { expect(filterObservations("estimate", "demo-1", "all")).toEqual([]); });
  it("never passes observations as proposed targets", () => { expect(filterObservations("target", "demo-1", "all")).toEqual([]); });
  it("updates both indicators from the exact filtered records", () => {
    const rows = filterObservations("simulated", "demo-1", "green");
    expect(rows.map((row) => row.id)).toEqual(["e", "f"]);
    const summary = summarizeObservations(rows);
    expect(summary.count).toBe(2);
    expect(summary.temperature).toBeCloseTo(28.9);
    expect(summary.vegetation).toBe(66.5);
  });
  it("fills the second demo window with coherent simulated records", () => {
    const rows = filterObservations("simulated", "demo-2", "all");
    expect(rows).toHaveLength(6);
    expect(summarizeObservations(rows).temperature).toBeCloseTo(31.5666667);
    expect(summarizeObservations(rows).vegetation).toBeCloseTo(38.1666667);
    expect(observationCsv(rows)).toContain("35.6;10;simulado");
  });
  it("represents an unavailable period with missing means, not zero", () => {
    expect(summarizeObservations(filterObservations("simulated", "unknown", "all"))).toEqual({ count: 0, temperature: null, vegetation: null });
  });
  it("exports only selected rows with their simulated provenance", () => {
    const csv = observationCsv(filterObservations("simulated", "demo-1", "dense"));
    expect(csv.split("\n")).toHaveLength(3);
    expect(csv).toContain("36.4;8;simulado;Termômetro Urbano");
    expect(csv).not.toContain("E — área arborizada");
  });
});