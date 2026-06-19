export const EIBOR_RATE = 5.15; // % per annum, 3-month EIBOR
export const EIBOR_LAST_UPDATED = "2025-06-15";

export function getVariableRate(spread: number): number {
  return EIBOR_RATE + spread;
}
