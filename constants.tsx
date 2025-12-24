
import { Polyhedron } from './types';

export const UNIFORM_POLYHEDRA: Polyhedron[] = [
  { name: "Tetrahedron", vt: 4, et: 6, ft: 4 },
  { name: "Triakis Tetrahedron", vt: 8, et: 18, ft: 12 },
  { name: "Octahedron", vt: 6, et: 12, ft: 8 },
  { name: "Cube", vt: 8, et: 12, ft: 6 },
  { name: "Truncated Tetrahedron", vt: 12, et: 18, ft: 8 },
  { name: "Cuboctahedron", vt: 12, et: 24, ft: 14 },
  { name: "Rhombic Dodecahedron", vt: 14, et: 24, ft: 12 },
  { name: "Icosahedron", vt: 12, et: 30, ft: 20 },
  { name: "Truncated Cube", vt: 24, et: 36, ft: 14 },
  { name: "Truncated Octahedron", vt: 24, et: 36, ft: 14 },
  { name: "Triakis Octahedron", vt: 14, et: 36, ft: 24 },
  { name: "Tetrakis Hexahedron", vt: 14, et: 36, ft: 24 },
  { name: "Rhombicuboctahedron", vt: 24, et: 48, ft: 26 },
  { name: "Deltoidal Icositetrahedron", vt: 26, et: 48, ft: 24 },
  { name: "Snub Cube", vt: 24, et: 60, ft: 38 },
  { name: "Dodecahedron", vt: 20, et: 30, ft: 12 },
  { name: "Icosidodecahedron", vt: 30, et: 60, ft: 32 },
  { name: "Pentagonal Icositetrahedron", vt: 38, et: 60, ft: 24 },
  { name: "Rhombic Triacontahedron", vt: 32, et: 60, ft: 30 },
  { name: "Disdyakis Dodecahedron", vt: 26, et: 72, ft: 48 },
  { name: "Truncated Cuboctahedron", vt: 48, et: 72, ft: 26 },
  { name: "Truncated Dodecahedron", vt: 60, et: 90, ft: 32 },
  { name: "Truncated Icosahedron", vt: 60, et: 90, ft: 32 },
  { name: "Triakis Icosahedron", vt: 32, et: 90, ft: 60 },
  { name: "Pentakis Dodecahedron", vt: 32, et: 90, ft: 60 },
  { name: "Rhombicosidodecahedron", vt: 60, et: 120, ft: 62 },
  { name: "Truncated Icosidodecahedron", vt: 60, et: 120, ft: 62 },
  { name: "Deltoidal Hexecontahedron", vt: 62, et: 120, ft: 60 },
  { name: "Snub Dodecahedron", vt: 60, et: 150, ft: 92 },
  { name: "Pentagonal Hexecontahedron", vt: 92, et: 150, ft: 60 },
  { name: "Disdyakis Triacontahedron", vt: 62, et: 180, ft: 120 }
];

export const COLORS = {
  primary: "#00E5FF", // Cyan
  secondary: "#FFB300", // Gold
  accent: "#FF00FF", // Magenta for highlights
  bg: "#000000",
  glass: "rgba(255, 255, 255, 0.05)",
  border: "rgba(255, 255, 255, 0.15)"
};
