import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { portfolio } from "@/data/portfolio-data";
import { renderMarkdown } from "@/lib/markdown";
import { SiteNav, SiteFooter } from "@/components/portfolio/Chrome";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = portfolio.blog.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post, html: renderMarkdown(post.body) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Post not found" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} — Vibhor Mishra` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.date,
            author: { "@type": "Person", name: "Vibhor Mishra", url: "https://vibhormishra.dev" },
            keywords: p.tags?.join(", "),
            mainEntityOfPage: `https://vibhormishra.dev/blog/${params.slug}`,
          }),
        },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post, html } = Route.useLoaderData();
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="pt-32">
        <article className="mx-auto max-w-3xl px-6">
          <Link to="/blog" className="font-mono text-xs text-ink-muted hover:text-foreground">
            ← Blog
          </Link>
          <p className="mt-6 font-mono text-xs text-brand">{post.date}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {post.title}
          </h1>
          <div
            className="prose prose-invert mt-10 max-w-none text-foreground [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-10 [&_h3]:font-display [&_h3]:mt-8 [&_p]:mt-4 [&_p]:text-ink-muted [&_a]:text-brand [&_code]:font-mono [&_pre]:bg-surface-elevated [&_pre]:rounded-xl [&_pre]:p-4"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div className="h-24" />
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
