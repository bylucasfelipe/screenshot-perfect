import { describe, expect, it } from "vitest";
import { esgDemonstrations, filterObservations, summarizeObservations } from "@/lib/observatory-data";

describe("Fictional ESG calculations", () => {
  it("uses the same vegetation values as the observatory", () => {
    expect(esgDemonstrations["Cobertura vegetal"].value).toBe(summarizeObservations(filterObservations("simulated", "demo-2", "all")).vegetation);
    expect(esgDemonstrations["Cobertura vegetal"].value).toBeCloseTo(229 / 600 * 100);
  });
  it("uses the stated fixed reference for thermal difference", () => {
    expect(esgDemonstrations["Diferença térmica de superfície"].value).toBeCloseTo(31.5666666667 - 28.9);
  });
  it("uses the populations of the two units above 34 degrees", () => {
    expect(esgDemonstrations["População em áreas de maior calor"].value).toBeCloseTo(2200 / 6000 * 100);
  });
  it("calculates access from 3300 of 6000 fictional residents", () => {
    expect(esgDemonstrations["Acesso territorial a áreas verdes públicas"].value).toBeCloseTo(3300 / 6000 * 100);
  });
  it("calculates completeness from nine of ten fictional sets", () => {
    expect(esgDemonstrations["Completude da documentação"].value).toBe(9 / 10 * 100);
  });
  it("calculates review from six of eight hypothetical cases", () => {
    expect(esgDemonstrations["Revisão humana de análises com IA"].value).toBe(6 / 8 * 100);
  });
});