import { createFileRoute, Link } from "@tanstack/react-router";
import { portfolio } from "@/data/portfolio-data";
import { SiteNav, SiteFooter, SectionHeading, EmptyState } from "@/components/portfolio/Chrome";
import { useState } from "react";

const CATEGORIES = ["All", "AI Systems", "Software Products", "Research", "Open Source", "Experiments"] as const;

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Vibhor Mishra" },
      { name: "description", content: "AI systems, software products, and research prototypes I've designed and shipped." },
      { property: "og:title", content: "Projects — Vibhor Mishra" },
      { property: "og:description", content: "AI systems, software products, and research prototypes." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const items = cat === "All" ? portfolio.projects : portfolio.projects.filter((p) => p.category === cat);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            as="h1"
            eyebrow="Portfolio"
            title="Everything I've built"
            description="Organized by engineering category. The four highlight systems are the current work I'm proudest of."
          />

          <div className="mb-8 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                  cat === c ? "border-brand bg-brand/10 text-foreground" : "border-hairline text-ink-muted hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {items.length === 0 ? (
            <EmptyState label="No projects in this category yet" />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((p) => (
                <Link
                  key={p.slug}
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="hairline group rounded-2xl bg-surface-elevated/40 p-6 transition-colors hover:bg-surface-elevated"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{p.category}</span>
                    {p.status && <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">{p.status}</span>}
                  </div>
                  <h3 className="mt-4 font-display text-3xl text-foreground">{p.name}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{p.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 6).map((s) => (
                      <span key={s} className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px] text-ink-muted">
                        {s}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="h-24" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
