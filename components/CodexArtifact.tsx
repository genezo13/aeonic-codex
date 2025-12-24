
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ResonanceResult } from '../types';
import { COLORS } from '../constants';

interface CodexArtifactProps {
  resonance: ResonanceResult;
}

const CodexArtifact: React.FC<CodexArtifactProps> = ({ resonance }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const { factors, invariants, polyhedron, score } = resonance;
    const { b, c, h, x, y } = factors;
    
    const width = 600;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Definitions for glows
    const defs = svg.append("defs");
    const createGlow = (id: string, color: string) => {
      const filter = defs.append("filter").attr("id", id);
      filter.append("feGaussianBlur").attr("stdDeviation", "3.5").attr("result", "blur");
      const merge = filter.append("feMerge");
      merge.append("feMergeNode").attr("in", "blur");
      merge.append("feMergeNode").attr("in", "SourceGraphic");
    };
    createGlow("cyan-glow", COLORS.primary);
    createGlow("gold-glow", COLORS.secondary);

    // 1. Grid Layer
    const grid = svg.append("g").attr("class", "grid").attr("opacity", 0.3);
    for (let i = 1; i <= 15; i++) {
      grid.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", (i * (width / 30)))
        .attr("fill", "none")
        .attr("stroke", "rgba(255,255,255,0.1)")
        .attr("stroke-width", 0.5);
    }
    
    // Crosshair lines
    grid.append("line").attr("x1", 0).attr("y1", centerY).attr("x2", width).attr("y2", centerY).attr("stroke", "rgba(255,255,255,0.2)");
    grid.append("line").attr("x1", centerX).attr("y1", 0).attr("x2", centerX).attr("y2", height).attr("stroke", "rgba(255,255,255,0.2)");

    // 2. Logarithmic Spiral (The Temporal Backbone)
    const spiralG = svg.append("g").attr("transform", `translate(${centerX}, ${centerY})`);
    const ratio = x / Math.max(0.001, y);
    const k = Math.log(ratio) / (2 * Math.PI);
    const a = 5;
    
    const spiralLine = d3.lineRadial<number>()
      .angle(d => d)
      .radius(d => a * Math.exp(k * d));

    const angles = d3.range(0, 10 * Math.PI, 0.1);

    spiralG.append("path")
      .datum(angles)
      .attr("d", spiralLine)
      .attr("fill", "none")
      .attr("stroke", COLORS.secondary)
      .attr("stroke-width", 1)
      .attr("opacity", 0.4)
      .attr("filter", "url(#gold-glow)");

    // 3. Central Geometric Shape (Polyhedral Wireframe Projection)
    const coreG = svg.append("g").attr("transform", `translate(${centerX}, ${centerY})`);
    
    // Determine complexity based on Vt (Vertices) and Et (Edges)
    const vt = polyhedron.vt;
    const et = polyhedron.et;
    
    // Base radius driven by Harmonic Factor 'c' and score
    const baseRadius = (width / 5) * (score > 0 ? Math.log10(score + 10) : 1);
    
    // Draw "Projected" vertices
    const vertexPoints: [number, number][] = d3.range(vt).map(i => {
      const angle = (i / vt) * 2 * Math.PI;
      // Use a "3D projection" effect by varying radius slightly based on vertex index
      const rOffset = (i % 2 === 0 ? 1 : 0.85); 
      return [
        baseRadius * rOffset * Math.cos(angle),
        baseRadius * rOffset * Math.sin(angle)
      ];
    });

    // Draw "Edges" (Et)
    // Connect each vertex to N others based on Et/Vt ratio
    const connectionsPerVertex = Math.ceil(et / vt);
    const edgeGroup = coreG.append("g").attr("class", "edges");
    
    vertexPoints.forEach((p1, i) => {
      for (let j = 1; j <= connectionsPerVertex; j++) {
        const p2 = vertexPoints[(i + j * Math.floor(vt / 4)) % vt];
        edgeGroup.append("line")
          .attr("x1", p1[0]).attr("y1", p1[1])
          .attr("x2", p2[0]).attr("y2", p2[1])
          .attr("stroke", COLORS.primary)
          .attr("stroke-width", 0.8)
          .attr("opacity", 0.25);
      }
    });

    // Draw "Face" boundaries (Projected outer polygon)
    const outerPath = d3.line<[number, number]>().curve(d3.curveLinearClosed);
    coreG.append("path")
      .attr("d", outerPath(vertexPoints))
      .attr("fill", "rgba(0, 229, 255, 0.05)")
      .attr("stroke", COLORS.primary)
      .attr("stroke-width", 2)
      .attr("filter", "url(#cyan-glow)");

    // 4. Central Oriented Right Triangle (Overlayed)
    const triangleScale = (width / 6) / Math.max(c, 1);
    const triangleG = svg.append("g")
      .attr("transform", `translate(${centerX}, ${centerY})`);

    const points: [number, number][] = [
      [0, 0],
      [b * triangleScale, 0],
      [0, -h * triangleScale]
    ];

    triangleG.append("polygon")
      .attr("points", points.map(p => p.join(",")).join(" "))
      .attr("fill", "rgba(255, 179, 0, 0.1)")
      .attr("stroke", COLORS.secondary)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4,2");

    // Labels and callouts
    const textGroup = svg.append("g").attr("style", "font-family: 'Space Grotesk'; font-size: 9px; fill: rgba(255,255,255,0.7); pointer-events: none;");
    
    // Add data points at key locations
    vertexPoints.slice(0, 4).forEach((p, i) => {
      const g = textGroup.append("g").attr("transform", `translate(${centerX + p[0]}, ${centerY + p[1]})`);
      g.append("text").attr("x", 5).attr("y", -5).text(`V[${i}]::${(p[0]/10).toFixed(1)}`);
      g.append("circle").attr("r", 2).attr("fill", COLORS.primary);
    });

    // 5. Resonance Field (Expanding circles based on invariants)
    const fieldG = svg.append("g").attr("transform", `translate(${centerX}, ${centerY})`);
    fieldG.append("circle")
      .attr("r", Math.max(10, invariants.hh * 4))
      .attr("fill", "none")
      .attr("stroke", COLORS.accent)
      .attr("stroke-width", 1)
      .attr("opacity", 0.5)
      .attr("stroke-dasharray", "10,10")
      .append("animateTransform")
      .attr("attributeName", "transform")
      .attr("type", "rotate")
      .attr("from", "0 0 0")
      .attr("to", "360 0 0")
      .attr("dur", "20s")
      .attr("repeatCount", "indefinite");

  }, [resonance]);

  const downloadSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `aeonic-codex-${resonance.polyhedron.name.toLowerCase().replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="glass rounded-xl p-4 mb-4 relative overflow-hidden shadow-2xl shadow-cyan-900/10">
        <svg 
          ref={svgRef} 
          width="600" 
          height="600" 
          viewBox="0 0 600 600"
          className="max-w-full h-auto cursor-crosshair"
        />
        <div className="absolute top-4 left-4 font-heading text-[10px] tracking-[0.4em] uppercase text-amber-500 opacity-60">
            Scalar Tech Artifact // Rev 2.5
        </div>
        <div className="absolute top-4 right-4 font-heading text-[10px] tracking-[0.2em] uppercase text-cyan-400 opacity-60">
            Resonance Locked
        </div>
        <div className="absolute bottom-4 right-4 text-[10px] text-gray-500 font-mono flex gap-4">
            <span>X: {resonance.factors.x.toFixed(4)}</span>
            <span>Y: {resonance.factors.y.toFixed(4)}</span>
        </div>
      </div>
      
      <button 
        onClick={downloadSVG}
        className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-cyan-500/50 rounded-full text-xs font-heading tracking-widest uppercase transition-all duration-300 flex items-center gap-2 group"
      >
        <span className="w-2 h-2 bg-cyan-400 rounded-full group-hover:animate-ping"></span>
        Export Artifact (.SVG)
      </button>
    </div>
  );
};

export default CodexArtifact;
