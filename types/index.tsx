export interface CustomError extends Error {
  status?: number;
}

export interface Aavegotchi {
  id: string;
  name: string;
  withSetsNumericTraits: [number, number, number, number, number, number];
  svg?: string;
}