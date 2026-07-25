import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio-data";
import { SectionHeading, EmptyState } from "./Chrome";

export { CurrentlyBuilding } from "./CurrentlyBuildingCard";

export function ImpactMetrics() {
  const metrics = [
    { value: portfolio.certifications.length, label: "Certifications", suffix: "+" },
    { value: portfolio.projects.length, label: "Projects", suffix: "+" },
    { value: portfolio.hackathons.length, label: "Hackathons", suffix: "+" },
    { value: portfolio.highlights.length, label: "Major AI Systems", suffix: "" },
  ];
  return (
    <section className="border-y border-hairline bg-surface-elevated/30">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-background px-6 py-8 text-center md:text-left">
            <div className="font-display text-4xl text-foreground md:text-5xl">
              {m.value}
              <span className="text-brand">{m.suffix}</span>
            </div>
            <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Mission() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="Mission" title="Why I do this" id="mission" />
      <p className="max-w-3xl font-display text-2xl leading-snug text-foreground md:text-3xl">
        {portfolio.mission}
      </p>
    </section>
  );
}

export function Timeline() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="Timeline" title="The path so far" id="timeline" />
      {portfolio.timeline.length === 0 ? (
        <EmptyState label="Add entries to portfolio-data.ts → timeline" />
      ) : (
        <ol className="relative border-l border-hairline pl-8">
          {portfolio.timeline.map((t, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative mb-10 last:mb-0"
            >
              <span className="absolute -left-[37px] top-1 grid h-4 w-4 place-items-center rounded-full border border-hairline bg-background">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs tracking-[0.2em] text-brand">{t.year}</span>
                {t.tag && (
                  <span className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                    {t.tag}
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-display text-xl text-foreground">{t.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{t.description}</p>
            </motion.li>
          ))}
        </ol>
      )}
    </section>
  );
}
