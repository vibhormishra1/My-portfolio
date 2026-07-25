import { useQuery } from "@tanstack/react-query";
import { fetchAllGithub, type ContributionsResponse } from "@/lib/github";
import { portfolio } from "@/data/portfolio-data";
import { SectionHeading, EmptyState } from "./Chrome";

const USERNAME = portfolio.personal.handle;

const LANG_COLORS: Record<string, string> = {
  Python: "oklch(0.75 0.13 60)",
  TypeScript: "oklch(0.75 0.13 240)",
  JavaScript: "oklch(0.85 0.16 90)",
  Java: "oklch(0.7 0.15 30)",
  HTML: "oklch(0.68 0.16 40)",
  CSS: "oklch(0.7 0.13 200)",
  Jupyter: "oklch(0.7 0.15 30)",
  Shell: "oklch(0.7 0.1 150)",
};
const langColor = (n: string) => LANG_COLORS[n] ?? "oklch(0.72 0.14 250)";

export function GithubActivity() {
  const q = useQuery({
    queryKey: ["gh", USERNAME],
    queryFn: () => fetchAllGithub(USERNAME),
    staleTime: 1000 * 60 * 10,
  });

  const data = q.data;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Engineering Activity"
        title="What I've been shipping on GitHub"
        description="Live from the public API. Falls back to an empty state if endpoints are unavailable."
        id="github"
      />

      {q.isLoading && (
        <div className="hairline rounded-2xl p-8 text-sm text-ink-muted">
          <span className="font-mono text-brand">$</span> git fetch origin main…
        </div>
      )}

      {!q.isLoading && !data && (
        <EmptyState label="GitHub data unavailable right now — try again in a moment" />
      )}

      {data && (
        <div className="space-y-6">
          {/* Profile header */}
          {data.user && (
            <div className="hairline flex flex-wrap items-center gap-6 rounded-2xl bg-surface-elevated/40 p-6">
              <img
                src={data.user.avatar_url}
                alt={`${data.user.login} avatar`}
                width={72}
                height={72}
                loading="lazy"
                className="h-18 w-18 rounded-full border border-hairline"
                style={{ height: 72, width: 72 }}
              />
              <div className="flex-1">
                <h3 className="font-display text-xl text-foreground">
                  {data.user.name ?? data.user.login}
                </h3>
                {data.user.bio && <p className="mt-1 text-sm text-ink-muted">{data.user.bio}</p>}
              </div>
              <div className="flex gap-6 font-mono text-xs text-ink-muted">
                <Stat label="Followers" value={data.user.followers} />
                <Stat label="Repos" value={data.user.public_repos} />
                <Stat label="Following" value={data.user.following} />
              </div>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Contribution graph */}
            <div className="hairline rounded-2xl bg-surface-elevated/40 p-6">
              <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
                Contributions · last year
              </h4>
              {data.contributions ? (
                <ContributionGrid c={data.contributions} />
              ) : (
                <p className="text-sm text-ink-muted">Contribution data unavailable.</p>
              )}
            </div>

            {/* Languages */}
            <div className="hairline rounded-2xl bg-surface-elevated/40 p-6">
              <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
                Top languages
              </h4>
              {data.languages.length === 0 ? (
                <p className="text-sm text-ink-muted">No languages detected yet.</p>
              ) : (
                <>
                  <div className="flex h-3 overflow-hidden rounded-full">
                    {data.languages.map((l) => (
                      <div
                        key={l.name}
                        style={{ width: `${l.pct}%`, background: langColor(l.name) }}
                        title={`${l.name} ${l.pct.toFixed(1)}%`}
                      />
                    ))}
                  </div>
                  <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    {data.languages.map((l) => (
                      <li key={l.name} className="flex items-center gap-2 text-ink-muted">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: langColor(l.name) }}
                        />
                        <span className="text-foreground">{l.name}</span>
                        <span className="ml-auto font-mono">{l.pct.toFixed(1)}%</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Pinned / recent repos */}
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              {data.pinned.length > 0 ? "Pinned repositories" : "Recent repositories"}
            </h4>
            <div className="grid gap-3 md:grid-cols-2">
              {(data.pinned.length > 0
                ? data.pinned.map((p) => ({
                    name: p.repo,
                    description: p.description ?? "",
                    html_url: p.link,
                    language: p.language ?? null,
                    stars: p.stars,
                    forks: p.forks,
                  }))
                : data.repos.slice(0, 6).map((r) => ({
                    name: r.name,
                    description: r.description ?? "",
                    html_url: r.html_url,
                    language: r.language,
                    stars: String(r.stargazers_count),
                    forks: String(r.forks_count),
                  }))
              ).map((r) => (
                <a
                  key={r.name}
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hairline group rounded-xl p-4 transition-colors hover:bg-surface-elevated"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm text-foreground group-hover:text-brand">
                      {r.name}
                    </p>
                    <span className="font-mono text-xs text-ink-muted">★ {r.stars}</span>
                  </div>
                  {r.description && <p className="mt-2 text-xs text-ink-muted">{r.description}</p>}
                  {r.language && (
                    <p className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-ink-muted">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: langColor(r.language) }}
                      />
                      {r.language}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Recent commits */}
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              Recent commits
            </h4>
            <div className="hairline divide-y divide-hairline rounded-2xl bg-surface-elevated/40">
              {data.events
                .filter((e) => e.type === "PushEvent")
                .slice(0, 5)
                .map((e) => {
                  const payload = e.payload as {
                    commits?: { sha?: string; message?: string }[];
                  };
                  const commits = payload?.commits ?? [];
                  return (
                    <div key={e.id} className="p-4 text-sm">
                      <p className="font-mono text-xs text-brand">{e.repo.name}</p>
                      <ul className="mt-1 space-y-0.5 text-ink-muted">
                        {commits.slice(0, 3).map((c, i) => (
                          <li key={i} className="truncate">
                            <span className="font-mono text-xs text-ink-muted">
                              {(c.sha ?? "").slice(0, 7)}
                            </span>{" "}
                            <span className="text-foreground">{c.message}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              {data.events.filter((e) => e.type === "PushEvent").length === 0 && (
                <p className="p-4 text-sm text-ink-muted">No recent public pushes.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="font-display text-lg text-foreground">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.2em]">{label}</div>
    </div>
  );
}

function ContributionGrid({ c }: { c: ContributionsResponse }) {
  // c.contributions is a flat array of daily entries. Bucket into 7-row weeks.
  const items = c.contributions;
  const first = new Date(items[0]?.date ?? Date.now());
  const startOffset = first.getDay();
  type DayCell = { date: string; count?: number; level: number } | null;
  const cells: DayCell[] = Array<DayCell>(startOffset).fill(null).concat(items);
  const weeks: (typeof cells)[] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  const levels = [
    "oklch(1 0 0 / 5%)",
    "oklch(0.55 0.09 250)",
    "oklch(0.62 0.12 250)",
    "oklch(0.7 0.14 250)",
    "oklch(0.8 0.16 250)",
  ];
  return (
    <div className="overflow-x-auto">
      <svg width={weeks.length * 12} height={7 * 12} className="min-w-full">
        {weeks.map((wk, x) =>
          wk.map((d, y) =>
            d ? (
              <rect
                key={`${x}-${y}`}
                x={x * 12}
                y={y * 12}
                width={10}
                height={10}
                rx={2}
                fill={levels[d.level ?? 0]}
              >
                <title>
                  {d.date}: {d.count ?? 0} contributions
                </title>
              </rect>
            ) : null,
          ),
        )}
      </svg>
    </div>
  );
}
