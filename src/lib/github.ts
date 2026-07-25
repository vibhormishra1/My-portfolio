// Tiny helpers for the GitHub public API. No auth needed for public data.
const GH = "https://api.github.com";

export type GhUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  location: string | null;
};

export type GhRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  languages_url: string;
  pushed_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

export type GhEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string; url: string };
  payload: any;
};

export type PinnedRepo = {
  owner: string;
  repo: string;
  link: string;
  description?: string;
  language?: string;
  languageColor?: string;
  stars: string;
  forks: string;
};

export type ContributionsResponse = {
  total: Record<string, number>;
  contributions: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
};

async function safeJson<T>(res: Response): Promise<T | null> {
  if (!res.ok) return null;
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchUser(username: string) {
  return safeJson<GhUser>(await fetch(`${GH}/users/${username}`));
}

export async function fetchRepos(username: string) {
  const data = await safeJson<GhRepo[]>(
    await fetch(`${GH}/users/${username}/repos?per_page=100&sort=updated`),
  );
  return (data ?? []).filter((r) => !r.fork && !r.archived);
}

export async function fetchEvents(username: string) {
  return (await safeJson<GhEvent[]>(await fetch(`${GH}/users/${username}/events/public`))) ?? [];
}

export async function fetchPinned(username: string) {
  return (
    (await safeJson<PinnedRepo[]>(
      await fetch(`https://gh-pinned-repos.egoist.dev/?username=${username}`),
    )) ?? []
  );
}

export async function fetchContributions(username: string) {
  return safeJson<ContributionsResponse>(
    await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
  );
}

export async function fetchLanguageStats(username: string) {
  const repos = await fetchRepos(username);
  const totals: Record<string, number> = {};
  // Fetch language bytes for up to 30 most-recent repos to stay under rate limits.
  const top = repos.slice(0, 30);
  await Promise.all(
    top.map(async (r) => {
      const langs = await safeJson<Record<string, number>>(await fetch(r.languages_url));
      if (!langs) return;
      for (const [k, v] of Object.entries(langs)) totals[k] = (totals[k] ?? 0) + v;
    }),
  );
  const sum = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(totals)
    .map(([name, bytes]) => ({ name, bytes, pct: (bytes / sum) * 100 }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 8);
}

export async function fetchAllGithub(username: string) {
  const [user, repos, events, pinned, contributions, languages] = await Promise.all([
    fetchUser(username),
    fetchRepos(username),
    fetchEvents(username),
    fetchPinned(username),
    fetchContributions(username),
    fetchLanguageStats(username),
  ]);
  return { user, repos, events, pinned, contributions, languages };
}
