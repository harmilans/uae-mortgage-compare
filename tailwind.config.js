export const EIBOR_RATE = 5.15;
export const EIBOR_LAST_UPDATED = "2025-06-15";
export function getVariableRate(spread: number): number { return EIBOR_RATE + spread; }
