import { describe, expect, it } from "vitest";
import { defaultWeights, labRows, rankLabAreas } from "@/lib/lab-data";
import { observations } from "@/lib/observatory-data";

describe("Local educational lab", () => {
  it("uses exclusively simulated local units, preserving the observatory inputs", () => {
    expect(labRows).toHaveLength(6);
    expect(labRows.every((row) => row.nature === "simulated")).toBe(true);
    expect(labRows.map(({ id, temperature, vegetation }) => ({ id, temperature, vegetation }))).toEqual(observations.map(({ id, temperature, vegetation }) => ({ id, temperature, vegetation })));
  });
  it("calculates transparent weighted scores, not predicted measurements", () => {
    const rows = rankLabAreas(defaultWeights);
    expect(rows[0]?.id).toBe("a");
    expect(rows[0]?.score).toBeCloseTo(81.6);
    expect(rows[0]?.priority).toBe("Alta");
    expect(rows.every((row) => row.score >= 0 && row.score <= 100)).toBe(true);
  });
  it("changes priority with user-adjusted social weights", () => {
    const first = rankLabAreas({ temperature: 0, vegetation: 0, social: 100 })[0];
    expect(first?.id).toBe("c");
    expect(first?.score).toBe(76);
  });
  it("does not invent classifications when every weight is zero", () => {
    expect(rankLabAreas({ temperature: 0, vegetation: 0, social: 0 })).toEqual([]);
  });
});