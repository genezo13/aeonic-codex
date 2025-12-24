
import React, { useState, useEffect, useMemo } from 'react';
import { analyzeResonance } from './services/geometryService';
import CodexArtifact from './components/CodexArtifact';
import { ResonanceResult } from './types';

const App: React.FC = () => {
  const [missionText, setMissionText] = useState<string>("Inscribe your mission statement here to generate its unique harmonic scalar artifact. Complexity breeds resonance.");
  const [resonance, setResonance] = useState<ResonanceResult>(analyzeResonance(""));

  useEffect(() => {
    const result = analyzeResonance(missionText);
    setResonance(result);
  }, [missionText]);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col items-center font-sans selection:bg-cyan-500/30">
      {/* Header */}
      <header className="w-full max-w-7xl flex flex-col items-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter bg-gradient-to-r from-cyan-400 via-white to-amber-500 bg-clip-text text-transparent mb-2">
          AEONIC CODEX GENERATOR
        </h1>
        <p className="text-sm md:text-base text-gray-500 font-heading uppercase tracking-[0.3em]">
          Computational Geometry // codexofresonance.com
        </p>
      </header>

      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Inputs & Invariants */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Mission Statement Input */}
          <section className="glass rounded-2xl p-6 relative">
            <h2 className="text-xl font-heading mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                MISSION STATEMENT
            </h2>
            <textarea
              className="w-full h-48 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-gray-300 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none placeholder-gray-600"
              placeholder="Enter your vision..."
              value={missionText}
              onChange={(e) => setMissionText(e.target.value)}
            />
            <div className="mt-4 flex justify-between items-center text-[10px] text-gray-500 font-mono">
              <span>LENGTH: {missionText.length} CHARS</span>
              <span className="text-cyan-400">RESONANCE: {resonance.score.toFixed(2)}</span>
            </div>
          </section>

          {/* Harmonic Invariants Table */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-heading mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                HARMONIC INVARIANTS
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-mono uppercase">Vh (Span)</span>
                <span className="text-2xl font-heading text-white">{resonance.invariants.vh.toFixed(3)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-mono uppercase">Eh (Edges)</span>
                <span className="text-2xl font-heading text-white">{resonance.invariants.eh.toFixed(3)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-mono uppercase">Hh (Harmonic)</span>
                <span className="text-2xl font-heading text-white">{resonance.invariants.hh.toFixed(3)}</span>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/5 pt-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Resonance State:</span>
                <span className="text-amber-500 font-semibold">{resonance.polyhedron.name}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Topological Counts:</span>
                <span className="font-mono text-xs">Vt: {resonance.polyhedron.vt} | Et: {resonance.polyhedron.et} | Ft: {resonance.polyhedron.ft}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Factor X (c + b):</span>
                <span className="font-mono text-cyan-400">{resonance.factors.x.toFixed(6)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Factor Y (c - b):</span>
                <span className="font-mono text-cyan-400">{resonance.factors.y.toFixed(6)}</span>
              </div>
            </div>
          </section>

          <div className="px-6 text-[10px] leading-relaxed text-gray-600 font-mono uppercase tracking-wider text-center lg:text-left">
            Invariants synthesized algebraically across the universal polyhedral family. <br/>
            The Scalar Synthesis of Harmonic Invariants // Dec 2025
          </div>
        </div>

        {/* Right Column: Visual Artifact */}
        <div className="lg:col-span-7 flex justify-center">
          <CodexArtifact resonance={resonance} />
        </div>

      </main>

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-white/5 rounded-full"></div>
      </div>
    </div>
  );
};

export default App;
