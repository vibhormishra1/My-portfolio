import { useState } from "react";
import { portfolio } from "@/data/portfolio-data";
import { SectionHeading, EmptyState } from "./Chrome";

export function Experience() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="Experience" title="Where I've worked" id="experience" />
      {portfolio.experience.length === 0 ? (
        <EmptyState label="Add experience to portfolio-data.ts → experience" />
      ) : (
        <div className="space-y-4">
          {portfolio.experience.map((e, i) => (
            <div key={i} className="hairline rounded-2xl p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl text-foreground">
                  {e.role} <span className="text-ink-muted">· {e.company}</span>
                </h3>
                <span className="font-mono text-xs text-ink-muted">{e.start} – {e.end ?? "Present"}</span>
              </div>
              {e.bullets && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-muted">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
              {e.stack && e.stack.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.stack.map((s) => (
                    <span key={s} className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px] text-ink-muted">{s}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function Education() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="Education" title="Learning path" id="education" />
      {portfolio.education.length === 0 ? (
        <EmptyState label="Add education to portfolio-data.ts → education" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {portfolio.education.map((e, i) => (
            <div key={i} className="hairline rounded-2xl p-6">
              <h3 className="font-display text-lg text-foreground">{e.school}</h3>
              <p className="text-sm text-ink-muted">{e.degree}</p>
              <p className="mt-2 font-mono text-xs text-ink-muted">{e.start} – {e.end ?? "Present"}</p>
              {e.notes && <p className="mt-2 text-sm text-ink-muted">{e.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function Hackathons() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="Hackathons" title="Where I've built under pressure" id="hackathons" />
      {portfolio.hackathons.length === 0 ? (
        <EmptyState label="Add hackathons to portfolio-data.ts → hackathons" />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {portfolio.hackathons.map((h, i) => (
            <a
              key={i}
              href={h.link ?? "#"}
              className="hairline rounded-2xl p-5 transition-colors hover:bg-surface-elevated"
            >
              <p className="font-mono text-xs text-brand">{h.year}</p>
              <h3 className="mt-2 font-display text-lg text-foreground">{h.name}</h3>
              {h.result && <p className="mt-1 text-sm text-foreground">{h.result}</p>}
              {h.project && <p className="mt-1 text-sm text-ink-muted">{h.project}</p>}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export function IndustrySimulations() {
  const items = portfolio.industrySims;
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Industry Simulations"
        title="Enterprise engineering exposure"
        description="Forage job simulations covering real engineering tasks."
        id="industry-sims"
      />
      {items.length === 0 ? (
        <EmptyState label="Add entries to portfolio-data.ts → industrySims" />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((s, i) => (
            <div key={i} className="hairline rounded-2xl p-5">
              <p className="font-mono text-xs text-brand">{s.year}</p>
              <h3 className="mt-2 font-display text-lg text-foreground">{s.provider}</h3>
              <p className="mt-1 text-sm text-foreground">{s.name}</p>
              {s.notes && <p className="mt-2 text-sm text-ink-muted">{s.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function Achievements() {
  const items = portfolio.achievements;
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="Achievements" title="Recognition & wins" id="achievements" />
      {items.length === 0 ? (
        <EmptyState label="Add entries to portfolio-data.ts → achievements" />
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {items.map((a, i) => (
            <li key={i} className="hairline flex items-start justify-between gap-3 rounded-xl p-4">
              <p className="text-sm text-foreground">{a.title}</p>
              {a.year && <span className="font-mono text-xs text-ink-muted">{a.year}</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const CERT_CATEGORIES = [
  "AI & Agentic AI",
  "Programming",
  "Cloud",
  "Software Engineering",
  "Industry Simulations",
  "Hackathons",
] as const;

export function Certifications() {
  const [view, setView] = useState<"grid" | "timeline">("grid");
  const items = portfolio.certifications;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Learning journey"
          title="Certifications & credentials"
          description="Grouped by domain — programming, AI, cloud, and industry simulations."
          id="certifications"
        />
        <div className="mb-12 flex gap-1 rounded-full border border-hairline p-1 font-mono text-xs">
          <button
            onClick={() => setView("grid")}
            className={`rounded-full px-3 py-1 ${view === "grid" ? "bg-foreground text-background" : "text-ink-muted"}`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("timeline")}
            className={`rounded-full px-3 py-1 ${view === "timeline" ? "bg-foreground text-background" : "text-ink-muted"}`}
          >
            Timeline
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState label="Add certifications to portfolio-data.ts → certifications" />
      ) : view === "grid" ? (
        <div className="space-y-8">
          {CERT_CATEGORIES.map((cat) => {
            const inCat = items.filter((c) => c.category === cat);
            if (inCat.length === 0) return null;
            return (
              <div key={cat}>
                <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand">{cat}</h3>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {inCat.map((c, i) => (
                    <a
                      key={i}
                      href={c.url ?? "#"}
                      className="hairline flex items-start justify-between gap-3 rounded-xl p-4 transition-colors hover:bg-surface-elevated"
                    >
                      <div>
                        <p className="text-sm text-foreground">{c.name}</p>
                        <p className="mt-0.5 text-xs text-ink-muted">{c.issuer}</p>
                      </div>
                      {c.year && <span className="font-mono text-xs text-ink-muted">{c.year}</span>}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <ol className="relative border-l border-hairline pl-8">
          {[...items].sort((a, b) => (a.year ?? "").localeCompare(b.year ?? "")).map((c, i) => (
            <li key={i} className="relative mb-6">
              <span className="absolute -left-[37px] top-1.5 h-2 w-2 rounded-full bg-brand" />
              <p className="font-mono text-xs text-brand">{c.year}</p>
              <p className="mt-1 text-sm text-foreground">{c.name}</p>
              <p className="text-xs text-ink-muted">{c.issuer} · {c.category}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
