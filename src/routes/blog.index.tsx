import { createFileRoute, Link } from "@tanstack/react-router";
import { portfolio } from "@/data/portfolio-data";
import { SiteNav, SiteFooter, SectionHeading, EmptyState } from "@/components/portfolio/Chrome";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Vibhor Mishra" },
      {
        name: "description",
        content: "Notes on agentic AI, backend systems, and engineering practice.",
      },
      { property: "og:title", content: "Blog — Vibhor Mishra" },
      {
        property: "og:description",
        content: "Notes on agentic AI, backend systems, and engineering practice.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="pt-32">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading as="h1" eyebrow="Writing" title="Technical blog" />
          {portfolio.blog.length === 0 ? (
            <EmptyState label="Add posts to portfolio-data.ts → blog" />
          ) : (
            <ul className="divide-y divide-hairline">
              {portfolio.blog.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="flex flex-col gap-1 py-6 transition-colors hover:text-foreground"
                  >
                    <p className="font-mono text-xs text-brand">{p.date}</p>
                    <h3 className="font-display text-2xl text-foreground">{p.title}</h3>
                    <p className="text-sm text-ink-muted">{p.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="h-24" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
