import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio-data";
import { SectionHeading, EmptyState } from "./Chrome";

// Hand-authored cluster positions per group for a clean, readable graph.
const CLUSTERS: Record<string, { cx: number; cy: number }> = {
  Languages: { cx: 0.5, cy: 0.5 },
  "Java Ecosystem": { cx: 0.18, cy: 0.22 },
  "Python & AI": { cx: 0.82, cy: 0.28 },
  Frontend: { cx: 0.82, cy: 0.75 },
  "Node & APIs": { cx: 0.5, cy: 0.88 },
  Databases: { cx: 0.18, cy: 0.75 },
  DevOps: { cx: 0.5, cy: 0.12 },
};

const GROUP_COLORS: Record<string, string> = {
  Languages: "oklch(0.85 0.02 260)",
  "Java Ecosystem": "oklch(0.75 0.14 40)",
  "Python & AI": "oklch(0.72 0.14 250)",
  Frontend: "oklch(0.75 0.13 200)",
  "Node & APIs": "oklch(0.78 0.13 150)",
  Databases: "oklch(0.75 0.13 80)",
  DevOps: "oklch(0.75 0.13 20)",
};

export function SkillsGraph() {
  const [filter, setFilter] = useState<string | "all">("all");
  const [hover, setHover] = useState<string | null>(null);

  const W = 900;
  const H = 560;
  const groups = Array.from(new Set(portfolio.skills.map((s) => s.group)));

  const positions = useMemo(() => {
    // Deterministic radial layout inside each cluster.
    const map: Record<string, { x: number; y: number; group: string }> = {};
    for (const g of groups) {
      const items = portfolio.skills.filter((s) => s.group === g);
      const c = CLUSTERS[g] ?? { cx: 0.5, cy: 0.5 };
      items.forEach((s, i) => {
        const angle = (i / Math.max(items.length, 1)) * Math.PI * 2;
        const r = 55 + (i % 3) * 24 + Math.min(items.length, 10) * 2;
        map[s.id] = {
          x: c.cx * W + Math.cos(angle) * r,
          y: c.cy * H + Math.sin(angle) * r,
          group: g,
        };
      });
    }
    return map;
  }, [groups]);

  const connectedIds = useMemo(() => {
    if (!hover) return new Set<string>();
    const set = new Set<string>([hover]);
    for (const [a, b] of portfolio.skillEdges) {
      if (a === hover) set.add(b);
      if (b === hover) set.add(a);
    }
    return set;
  }, [hover]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Skills"
        title="How the pieces connect"
        description="Hover a node to see its neighbourhood. Filter by cluster."
        id="skills"
      />
      {portfolio.skills.length === 0 ? (
        <EmptyState label="Add skills + edges to portfolio-data.ts → skills / skillEdges" />
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-2">
            <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
              All
            </FilterChip>
            {groups.map((g) => (
              <FilterChip key={g} active={filter === g} onClick={() => setFilter(g)}>
                <span
                  className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: GROUP_COLORS[g] }}
                />
                {g}
              </FilterChip>
            ))}
          </div>

          <div className="hairline overflow-hidden rounded-2xl bg-surface-elevated/40">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-[560px] w-full">
              {portfolio.skillEdges.map(([a, b], i) => {
                const pa = positions[a],
                  pb = positions[b];
                if (!pa || !pb) return null;
                const active = hover && (a === hover || b === hover);
                const dim = filter !== "all" && pa.group !== filter && pb.group !== filter;
                return (
                  <line
                    key={i}
                    x1={pa.x}
                    y1={pa.y}
                    x2={pb.x}
                    y2={pb.y}
                    stroke={active ? "var(--brand)" : "oklch(1 0 0)"}
                    strokeOpacity={dim ? 0.04 : active ? 0.6 : 0.12}
                    strokeWidth={active ? 1.4 : 1}
                  />
                );
              })}
              {portfolio.skills.map((s) => {
                const p = positions[s.id];
                if (!p) return null;
                const dim = filter !== "all" && s.group !== filter;
                const highlight = hover && connectedIds.has(s.id);
                const color = GROUP_COLORS[s.group];
                return (
                  <g
                    key={s.id}
                    onMouseEnter={() => setHover(s.id)}
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: "pointer" }}
                    opacity={dim ? 0.2 : 1}
                  >
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r={highlight ? 22 : 16}
                      fill={color}
                      fillOpacity={highlight ? 0.25 : 0.12}
                      animate={{ r: highlight ? 22 : 16 }}
                    />
                    <circle cx={p.x} cy={p.y} r={5} fill={color} />
                    <text
                      x={p.x}
                      y={p.y - 14}
                      textAnchor="middle"
                      className="fill-foreground font-mono"
                      fontSize={11}
                    >
                      {s.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Fallback grouped list for accessibility + mobile */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {groups.map((g) => (
              <div key={g} className="hairline rounded-xl p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: GROUP_COLORS[g] }}
                  />
                  <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
                    {g}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {portfolio.skills
                    .filter((s) => s.group === g)
                    .map((s) => (
                      <span
                        key={s.id}
                        className="rounded-full border border-hairline px-2 py-0.5 text-xs text-foreground"
                      >
                        {s.label}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
        active
          ? "border-brand bg-brand/10 text-foreground"
          : "border-hairline text-ink-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
