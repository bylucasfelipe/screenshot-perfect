import { observations } from "@/lib/observatory-data";

// Educational extensions of the same fictitious units. Not census data.
const simulatedLowIncome: Record<string, number> = { a: 68, b: 32, c: 76, d: 44, e: 28, f: 18 };
export const labRows = observations.map((row) => ({ ...row, lowIncome: simulatedLowIncome[row.id] ?? 0, nature: "simulated" as const }));
export type LabWeights = { temperature: number; vegetation: number; social: number };
export const defaultWeights: LabWeights = { temperature: 40, vegetation: 30, social: 30 };

export function rankLabAreas(weights: LabWeights) {
  const total = weights.temperature + weights.vegetation + weights.social;
  if (total <= 0) return [];
  return labRows.map((row) => {
    const thermal = Math.max(0, Math.min(1, (row.temperature - 28) / 10));
    const score = 100 * (thermal * weights.temperature + (1 - row.vegetation / 100) * weights.vegetation + row.lowIncome / 100 * weights.social) / total;
    return { ...row, score, priority: score >= 65 ? "Alta" : score >= 40 ? "Intermediária" : "Menor" };
  }).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
}