import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio-data";
import { SectionHeading, EmptyState } from "./Chrome";

export function HighlightProjects() {
  const projects = portfolio.highlights
    .map((slug) => portfolio.projects.find((p) => p.slug === slug))
    .filter(Boolean) as typeof portfolio.projects;
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading eyebrow="Featured work" title="Systems I've designed and shipped" />
        <Link
          to="/projects"
          className="hidden shrink-0 font-mono text-sm text-brand hover:text-foreground md:inline"
        >
          All projects →
        </Link>
      </div>
      {projects.length === 0 ? (
        <EmptyState label="Add projects to portfolio-data.ts → projects and reference their slugs in highlights[]" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="hairline group flex h-full flex-col justify-between rounded-2xl bg-surface-elevated/40 p-8 transition-all hover:bg-surface-elevated hover:shadow-[0_0_60px_-30px_var(--brand)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
                      {p.category}
                    </span>
                    {p.status && (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                        {p.status}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-6 font-display text-4xl text-foreground">{p.name}</h3>
                  <p className="mt-2 text-base text-ink-muted">{p.tagline}</p>
                  {p.overview && <p className="mt-4 text-sm text-ink-muted">{p.overview}</p>}
                </div>
                <div className="mt-8 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 5).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] text-ink-muted"
                    >
                      {s}
                    </span>
                  ))}
                  {p.stack.length > 5 && (
                    <span className="font-mono text-[10px] text-ink-muted">
                      +{p.stack.length - 5} more
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

export function ResearchInterests() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="Research" title="Research interests" id="research" />
      {portfolio.research.length === 0 ? (
        <EmptyState label="Add research interests to portfolio-data.ts → research" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {portfolio.research.map((r) => (
            <div key={r.title} className="hairline rounded-2xl bg-surface-elevated/40 p-6">
              <h3 className="font-display text-xl text-foreground">{r.title}</h3>
              {r.blurb && <p className="mt-2 text-sm text-ink-muted">{r.blurb}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function SystemDesignSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="System Design"
        title="Where I think about depth"
        description="The engineering surfaces that shape production AI systems."
        id="system-design"
      />
      {portfolio.systemDesignAreas.length === 0 ? (
        <EmptyState label="Add areas to portfolio-data.ts → systemDesignAreas" />
      ) : (
        <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-3">
          {portfolio.systemDesignAreas.map((a) => (
            <div key={a.title} className="bg-background p-6">
              <h3 className="font-display text-lg text-foreground">{a.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{a.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
