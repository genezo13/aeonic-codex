
export interface Polyhedron {
  name: string;
  vt: number;
  et: number;
  ft: number;
}

export interface HarmonicFactors {
  u: number;
  w: number;
  c: number;
  h: number;
  b: number;
  x: number;
  y: number;
}

export interface HarmonicInvariants {
  vh: number;
  eh: number;
  hh: number;
}

export interface ResonanceResult {
  polyhedron: Polyhedron;
  factors: HarmonicFactors;
  invariants: HarmonicInvariants;
  score: number;
}
