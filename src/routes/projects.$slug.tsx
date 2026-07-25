import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { portfolio } from "@/data/portfolio-data";
import type { Project } from "@/data/portfolio-types";
import { SiteNav, SiteFooter, EmptyState } from "@/components/portfolio/Chrome";
import { ArchitectureDiagram } from "@/components/portfolio/ArchitectureDiagram";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = portfolio.projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.project;
    const title = `${p.name} — ${p.tagline}`;
    return {
      meta: [
        { title },
        { name: "description", content: p.overview ?? p.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: p.overview ?? p.tagline },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: p.name,
            headline: title,
            description: p.overview ?? p.tagline,
            keywords: p.stack?.join(", "),
            about: p.category,
            creator: { "@type": "Person", name: "Vibhor Mishra", url: "https://vibhormishra.dev" },
            url: `https://vibhormishra.dev/projects/${params.slug}`,
          }),
        },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData() as { project: Project };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="pt-32">
        <div className="mx-auto max-w-4xl px-6">
          <Link to="/projects" className="font-mono text-xs text-ink-muted hover:text-foreground">
            ← All projects
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{p.category}</span>
            {p.status && <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">· {p.status}</span>}
          </div>
          <h1 className="mt-3 font-display text-5xl leading-tight text-foreground md:text-6xl">{p.name}</h1>
          <p className="mt-4 text-xl text-ink-muted">{p.tagline}</p>

          {p.overview && (
            <section className="mt-12">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Overview</h2>
              <p className="mt-3 text-base text-foreground">{p.overview}</p>
            </section>
          )}

          <CaseStudyBlock title="Problem" body={p.problem} />
          <CaseStudyBlock title="Why existing solutions fall short" body={p.gapsInExistingSolutions} />
          <CaseStudyBlock title="My approach" body={p.approach} />

          {(p.architecture && p.architecture.length > 0) ? (
            <section className="mt-16">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Architecture</h2>
              <div className="mt-6 space-y-8">
                {p.architecture.map((v) => (
                  <div key={v.id}>
                    <h3 className="font-display text-2xl text-foreground">{v.title}</h3>
                    {v.summary && <p className="mt-2 text-sm text-ink-muted">{v.summary}</p>}
                    <div className="mt-4">
                      <ArchitectureDiagram view={v} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="mt-16">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Architecture</h2>
              <div className="mt-4">
                <EmptyState label={`Add architecture views for ${p.slug} in portfolio-data.ts → projects[].architecture`} />
              </div>
            </section>
          )}

          <ListBlock title="Engineering decisions" items={p.engineeringDecisions} />
          <ListBlock title="Trade-offs" items={p.tradeoffs} />
          <ListBlock title="Key features" items={p.keyFeatures} />
          <ListBlock title="Challenges" items={p.challenges} />
          <ListBlock title="Lessons learned" items={p.lessons} />
          <ListBlock title="Future roadmap" items={p.futureWork} />

          <section className="mt-16">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Stack</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-hairline px-3 py-1 font-mono text-xs text-foreground">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {(p.links?.github || p.links?.demo) && (
            <section className="mt-16 flex flex-wrap gap-3">
              {p.links.github && (
                <a href={p.links.github} className="rounded-full border border-hairline px-4 py-2 text-sm text-foreground hover:bg-accent">
                  GitHub →
                </a>
              )}
              {p.links.demo && (
                <a href={p.links.demo} className="rounded-full bg-foreground px-4 py-2 text-sm text-background hover:bg-foreground/90">
                  Live demo →
                </a>
              )}
            </section>
          )}

          <div className="h-24" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function CaseStudyBlock({ title, body }: { title: string; body?: string }) {
  if (!body) return null;
  return (
    <section className="mt-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{title}</h2>
      <p className="mt-3 text-base text-foreground">{body}</p>
    </section>
  );
}
function ListBlock({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="mt-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{title}</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-base text-foreground">
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </section>
  );
}
