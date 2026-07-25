import type { ArchitectureView, ArchitectureNode } from "@/data/portfolio-types";

const LAYER_ROWS: Record<ArchitectureNode["layer"], number> = {
  client: 0,
  gateway: 1,
  service: 2,
  agent: 2,
  data: 3,
  external: 3,
  infra: 4,
};

const LAYER_COLORS: Record<ArchitectureNode["layer"], string> = {
  client: "oklch(0.85 0.02 260)",
  gateway: "oklch(0.75 0.13 200)",
  service: "oklch(0.75 0.13 150)",
  agent: "oklch(0.72 0.14 250)",
  data: "oklch(0.75 0.13 60)",
  external: "oklch(0.7 0.11 300)",
  infra: "oklch(0.75 0.13 20)",
};

export function ArchitectureDiagram({ view }: { view: ArchitectureView }) {
  const W = 960;
  const rowHeight = 130;
  const rows: Record<number, ArchitectureNode[]> = {};
  for (const n of view.nodes) {
    const r = LAYER_ROWS[n.layer];
    rows[r] = rows[r] ?? [];
    rows[r].push(n);
  }
  const rowKeys = Object.keys(rows)
    .map(Number)
    .sort((a, b) => a - b);
  const H = rowKeys.length * rowHeight + 40;

  const pos: Record<string, { x: number; y: number; w: number }> = {};
  rowKeys.forEach((r, ri) => {
    const items = rows[r];
    const gap = W / (items.length + 1);
    items.forEach((n, i) => {
      pos[n.id] = { x: gap * (i + 1), y: 40 + ri * rowHeight, w: 150 };
    });
  });

  return (
    <div className="hairline overflow-x-auto rounded-2xl bg-surface-elevated/40 p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="min-w-full">
        {view.edges.map((e, i) => {
          const a = pos[e.from],
            b = pos[e.to];
          if (!a || !b) return null;
          const midY = (a.y + b.y) / 2;
          return (
            <g key={i}>
              <path
                d={`M ${a.x} ${a.y + 22} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y - 22}`}
                stroke="var(--brand)"
                strokeOpacity={0.35}
                fill="none"
                strokeWidth={1.2}
              />
              {e.label && (
                <text
                  x={(a.x + b.x) / 2}
                  y={midY}
                  textAnchor="middle"
                  className="fill-current font-mono"
                  fontSize={9}
                  fill="oklch(0.68 0.01 260)"
                >
                  {e.label}
                </text>
              )}
            </g>
          );
        })}
        {view.nodes.map((n) => {
          const p = pos[n.id];
          const color = LAYER_COLORS[n.layer];
          return (
            <g key={n.id} transform={`translate(${p.x - p.w / 2}, ${p.y - 22})`}>
              <rect
                width={p.w}
                height={44}
                rx={10}
                fill="oklch(0.19 0.006 260)"
                stroke={color}
                strokeOpacity={0.5}
              />
              <circle cx={12} cy={22} r={4} fill={color} />
              <text
                x={24}
                y={20}
                className="fill-foreground"
                fontSize={12}
                fontFamily="Geist, Inter"
              >
                {n.label}
              </text>
              <text
                x={24}
                y={34}
                fontSize={9}
                fontFamily="IBM Plex Mono"
                fill="oklch(0.68 0.01 260)"
              >
                {n.layer}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
