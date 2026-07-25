import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Floating AI-agent nodes connected by lines. SVG, cheap, respectful of reduced motion.
export function AgentNodes({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 600, h: 500 });

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current.parentElement!;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const nodes = [
    { id: "n1", x: 0.2, y: 0.25, r: 6, label: "planner" },
    { id: "n2", x: 0.5, y: 0.15, r: 5, label: "router" },
    { id: "n3", x: 0.78, y: 0.3, r: 7, label: "retriever" },
    { id: "n4", x: 0.35, y: 0.55, r: 5, label: "critic" },
    { id: "n5", x: 0.62, y: 0.6, r: 6, label: "executor" },
    { id: "n6", x: 0.25, y: 0.82, r: 4, label: "memory" },
    { id: "n7", x: 0.75, y: 0.82, r: 5, label: "tool" },
    { id: "n8", x: 0.5, y: 0.4, r: 8, label: "core" },
  ];
  const edges: [string, string][] = [
    ["n1", "n2"],
    ["n2", "n3"],
    ["n1", "n4"],
    ["n2", "n8"],
    ["n3", "n8"],
    ["n4", "n8"],
    ["n5", "n8"],
    ["n4", "n5"],
    ["n6", "n4"],
    ["n7", "n5"],
    ["n6", "n8"],
    ["n7", "n8"],
  ];

  const pos = Object.fromEntries(nodes.map((n) => [n.id, { x: n.x * size.w, y: n.y * size.h }]));

  return (
    <div className={`relative h-full w-full ${className}`}>
      <svg ref={ref} viewBox={`0 0 ${size.w} ${size.h}`} className="h-full w-full">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.72 0.14 250)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.72 0.14 250)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          cx={size.w / 2}
          cy={size.h / 2}
          r={Math.min(size.w, size.h) * 0.35}
          fill="url(#glow)"
        />
        {edges.map(([a, b], i) => {
          const p1 = pos[a],
            p2 = pos[b];
          if (!p1 || !p2) return null;
          return (
            <motion.line
              key={i}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="oklch(0.72 0.14 250)"
              strokeOpacity={0.18}
              strokeWidth={0.8}
              initial={{ pathLength: 0 }}
              animate={reduced ? { pathLength: 1 } : { pathLength: [0.2, 1, 0.2] }}
              transition={{
                duration: 5 + i * 0.3,
                repeat: reduced ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
        {nodes.map((n, i) => {
          const p = pos[n.id];
          return (
            <g key={n.id}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={n.r}
                fill="oklch(0.72 0.14 250)"
                animate={reduced ? {} : { y: [0, -6, 0, 6, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 6 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={n.r + 4}
                fill="none"
                stroke="oklch(0.72 0.14 250)"
                strokeOpacity={0.3}
                animate={reduced ? {} : { r: [n.r + 2, n.r + 10, n.r + 2], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: "easeOut" }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
