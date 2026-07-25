import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { portfolio } from "@/data/portfolio-data";
import { SectionHeading } from "./Chrome";

export function AIPlayground() {
  const [selected, setSelected] = useState<number | null>(0);
  const [typed, setTyped] = useState("");

  const suggestions = portfolio.aiPlaygroundResponses;

  const ask = (i: number) => {
    setSelected(i);
    setTyped(suggestions[i].q);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="AI Playground"
        title="Ask my AI"
        description="A tiny knowledge base speaks for me. This is a mock — the same UI will host a RAG-powered version later."
        id="playground"
      />

      <div className="hairline rounded-2xl bg-surface-elevated/40 p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => ask(i)}
              className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                selected === i
                  ? "border-brand bg-brand/10 text-foreground"
                  : "border-hairline text-ink-muted hover:text-foreground"
              }`}
            >
              {s.q}
            </button>
          ))}
        </div>

        <div className="rounded-xl bg-background p-4 font-mono text-sm">
          <div className="flex items-center gap-2 text-ink-muted">
            <span className="text-brand">you</span>
            <span>›</span>
            <span className="text-foreground">{typed || "select a question above"}</span>
          </div>
          {selected !== null && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 border-t border-hairline pt-4"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 rounded-full bg-brand/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-brand">
                  ai
                </span>
                <p className="text-foreground">{suggestions[selected].a}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export function BlogPreview() {
  const posts = portfolio.blog.slice(0, 3);
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="Writing" title="Technical blog" id="blog" />
      {posts.length === 0 ? (
        <div className="hairline rounded-2xl border-dashed p-8 text-sm text-ink-muted">
          <span className="font-mono text-xs text-brand">TODO</span> — Add blog posts to
          portfolio-data.ts → blog
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="hairline group flex flex-col rounded-2xl bg-surface-elevated/40 p-6 transition-colors hover:bg-surface-elevated"
              >
                <p className="font-mono text-xs text-brand">{p.date}</p>
                <h3 className="mt-3 font-display text-lg text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{p.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px] text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-mono text-sm text-brand hover:underline"
            >
              See all posts →
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
