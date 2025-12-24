
import { HarmonicFactors, HarmonicInvariants, Polyhedron, ResonanceResult } from '../types';
import { UNIFORM_POLYHEDRA } from '../constants';

/**
 * Implements the harmonic_factors(Vt, Et) function from the research.
 * Definitions: u = Vt/2, w = sqrt(Et), c = max(u,w), h = min(u,w)
 * b = sqrt(c^2 - h^2)
 */
export const calculateHarmonicFactors = (vt: number, et: number): HarmonicFactors => {
  const u = vt / 2.0;
  const w = Math.sqrt(et);
  const c = Math.max(u, w);
  const h = Math.min(u, w);
  const b = Math.sqrt(Math.abs(c * c - h * h));
  const x = c + b;
  const y = c - b;
  
  return { u, w, c, h, b, x, y };
};

/**
 * Calculates the invariants based on harmonic factors.
 */
export const calculateInvariants = (x: number, y: number): HarmonicInvariants => {
  const vh = x + y;
  const eh = x * y;
  const hh = (x + y) === 0 ? 0 : (2 * x * y) / (x + y);
  
  return { vh, eh, hh };
};

/**
 * Analyzes text to determine a resonance score based on sentiment and complexity.
 */
export const analyzeResonance = (text: string): ResonanceResult => {
  if (!text.trim()) {
    const p = UNIFORM_POLYHEDRA[0];
    const factors = calculateHarmonicFactors(p.vt, p.et);
    const invariants = calculateInvariants(factors.x, factors.y);
    return { polyhedron: p, factors, invariants, score: 0 };
  }

  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  const uniqueWords = new Set(words).size;
  const textLength = text.length;

  // Simple sentiment/intensity heuristic
  const intensityKeywords = ['intense', 'fire', 'sharp', 'fast', 'quick', 'power', 'core', 'direct'];
  const visionaryKeywords = ['visionary', 'complex', 'infinite', 'eternal', 'multidimensional', 'harmonic', 'resonance', 'transcendence'];
  
  let intensityBoost = words.filter(w => intensityKeywords.includes(w)).length * 10;
  let visionaryBoost = words.filter(w => visionaryKeywords.includes(w)).length * 20;

  // Scoring formula: complexity weight + sentiment weight
  // Short/Intense text maps to lower indices (e.g. Tetrahedron)
  // Long/Complex/Visionary text maps to higher indices (e.g. Truncated Icosidodecahedron)
  const complexityFactor = uniqueWords * (textLength / 50);
  const baseScore = Math.max(0, complexityFactor + intensityBoost + visionaryBoost);
  
  // Normalize mapping (0 to 30)
  // Higher scores approach complex Archimedean solids
  const targetIndex = Math.min(
    Math.floor((baseScore / 150) * (UNIFORM_POLYHEDRA.length - 1)), 
    UNIFORM_POLYHEDRA.length - 1
  );
  
  const p = UNIFORM_POLYHEDRA[targetIndex];
  const factors = calculateHarmonicFactors(p.vt, p.et);
  const invariants = calculateInvariants(factors.x, factors.y);
  
  return { 
    polyhedron: p, 
    factors, 
    invariants, 
    score: baseScore 
  };
};
