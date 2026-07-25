import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { portfolio } from "@/data/portfolio-data";
import { SectionHeading, EmptyState } from "./Chrome";
import type { CurrentlyBuilding } from "@/data/portfolio-types";

type RepoData = {
  html_url: string;
  pushed_at: string;
  updated_at: string;
  archived: boolean;
  private: boolean;
  default_branch: string;
  description: string | null;
};

type CommitData = {
  sha: string;
  html_url: string;
  commit: { message: string; author: { date: string; name: string } };
};

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function useRepo(repo: string | undefined) {
  const [data, setData] = useState<{ repo: RepoData | null; commit: CommitData | null; error: boolean; loading: boolean }>({
    repo: null,
    commit: null,
    error: false,
    loading: !!repo,
  });

  useEffect(() => {
    if (!repo) {
      setData({ repo: null, commit: null, error: false, loading: false });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [repoRes, commitRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${repo}`),
          fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`),
        ]);
        if (cancelled) return;
        if (!repoRes.ok) {
          setData({ repo: null, commit: null, error: true, loading: false });
          return;
        }
        const repoJson = (await repoRes.json()) as RepoData;
        const commits = commitRes.ok ? ((await commitRes.json()) as CommitData[]) : [];
        setData({ repo: repoJson, commit: commits[0] ?? null, error: false, loading: false });
      } catch {
        if (!cancelled) setData({ repo: null, commit: null, error: true, loading: false });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [repo]);

  return data;
}

function Card({ item }: { item: CurrentlyBuilding }) {
  const { repo, commit, loading, error } = useRepo(item.repo);

  const statusLabel = repo
    ? repo.archived
      ? "Archived"
      : repo.private
        ? "Private"
        : "Public · Active"
    : item.repo && !loading
      ? "Repository coming soon"
      : item.status;

  return (
    <Link
      to="/projects/$slug"
      params={{ slug: item.slug }}
      className="hairline group rounded-2xl bg-surface-elevated/40 p-6 transition-colors hover:bg-surface-elevated"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">{item.status}</span>
      </div>

      <h3 className="mt-4 font-display text-2xl text-foreground">{item.name}</h3>
      <p className="mt-1 text-sm text-ink-muted">{item.tagline}</p>

      <div className="mt-6 space-y-3 border-t border-hairline pt-4 text-sm">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Current milestone</div>
          <p className="mt-1 text-foreground">{item.milestone}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Last commit</div>
            <p className="mt-1 truncate text-xs text-foreground" title={commit?.commit.message}>
              {loading
                ? "Loading…"
                : commit
                  ? commit.commit.message.split("\n")[0]
                  : error || !item.repo
                    ? "—"
                    : "No commits yet"}
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Last updated</div>
            <p className="mt-1 text-xs text-foreground">
              {loading
                ? "Loading…"
                : repo
                  ? formatRelative(repo.pushed_at || repo.updated_at)
                  : "—"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand">{statusLabel}</span>
          {repo ? (
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-mono text-xs text-ink-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              github ↗
            </a>
          ) : item.repo ? (
            <span className="font-mono text-xs text-ink-muted">private / soon</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export function CurrentlyBuilding() {
  const items = portfolio.currentlyBuilding;
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Currently"
        title="What I'm building right now"
        description="Live workbench, powered by GitHub."
        id="building"
      />
      {items.length === 0 ? (
        <EmptyState label="Add entries to portfolio-data.ts → currentlyBuilding" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <Card key={c.slug} item={c} />
          ))}
        </div>
      )}
    </section>
  );
}
