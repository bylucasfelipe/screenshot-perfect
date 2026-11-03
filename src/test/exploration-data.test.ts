import { describe, expect, it } from "vitest";
import { exploreObservations, observationIntensity, observations } from "@/lib/observatory-data";

describe("Integrated schematic exploration", () => {
  it("keeps all six comparison rows while summarizing the selected unit", () => {
    const view = exploreObservations("simulated", "demo-1", "all", "temperature", "all", "a");
    expect(view.rows).toHaveLength(6);
    expect(view.selected?.temperature).toBe(36.4);
    expect(view.summary).toEqual({ count: 1, temperature: 36.4, vegetation: 8 });
    expect(view.difference).toBeCloseTo(4.3);
  });
  it("filters the map, comparison and summaries by temperature intensity", () => {
    const view = exploreObservations("simulated", "demo-1", "all", "temperature", "high", "all");
    expect(view.rows.map((row) => row.id)).toEqual(["a", "b"]);
    expect(view.summary.temperature).toBeCloseTo(35.6);
    expect(view.reference.temperature).toBeCloseTo(32.1);
  });
  it("uses vegetation-specific bands without interpreting them as heat", () => {
    const view = exploreObservations("simulated", "demo-2", "all", "vegetation", "high", "all");
    expect(view.rows.map((row) => row.id)).toEqual(["e", "f"]);
    expect(view.summary.vegetation).toBe(69.5);
  });
  it("retains matching selected units across periods and reports exact changes", () => {
    const view = exploreObservations("simulated", "demo-2", "all", "temperature", "all", "a");
    expect(view.selected?.temperature).toBe(35.6);
    expect(view.periodDifference).toBeCloseTo(-0.8);
  });
  it("does not report a selected unit excluded by the other filters", () => {
    const view = exploreObservations("simulated", "demo-1", "green", "temperature", "all", "a");
    expect(view.selected).toBeUndefined();
    expect(view.summary.count).toBe(2);
    expect(view.difference).toBeNull();
  });
  it("preserves honest empty states and unavailable means", () => {
    const view = exploreObservations("public", "demo-1", "all", "temperature", "all", "a");
    expect(view.rows).toEqual([]);
    expect(view.summary.temperature).toBeNull();
    expect(view.difference).toBeNull();
  });
  it("uses fixed band boundaries and remains correct at their edges", () => {
    const row = observations[0];
    if (!row) throw new Error("Missing original fixture");
    expect(observationIntensity({ ...row, temperature: 30 }, "temperature")).toBe("medium");
    expect(observationIntensity({ ...row, temperature: 34 }, "temperature")).toBe("high");
    expect(observationIntensity({ ...row, vegetation: 20 }, "vegetation")).toBe("medium");
    expect(observationIntensity({ ...row, vegetation: 50 }, "vegetation")).toBe("high");
  });
});