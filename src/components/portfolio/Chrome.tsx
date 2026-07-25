import { Link } from "@tanstack/react-router";
import { portfolio } from "@/data/portfolio-data";

export function SiteNav() {
  const links = [
    { label: "Work", href: "/#projects" },
    { label: "Skills", href: "/#skills" },
    { label: "System Design", href: "/#system-design" },
    { label: "GitHub", href: "/#github" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
      <nav className="glass flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 text-sm">
        <Link to="/" className="flex items-center gap-2 font-mono text-xs tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-brand shadow-[0_0_12px_var(--brand)]" />
          <span className="text-foreground">vibhor.mishra</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) =>
            l.href.startsWith("/#") ? (
              <a key={l.href} href={l.href} className="text-ink-muted transition-colors hover:text-foreground">
                {l.label}
              </a>
            ) : (
              <Link key={l.href} to={l.href} className="text-ink-muted transition-colors hover:text-foreground">
                {l.label}
              </Link>
            ),
          )}
        </div>
        {portfolio.personal.resumeUrl ? (
          <a
            href={portfolio.personal.resumeUrl}
            download="Vibhor_Mishra_Resume.pdf"
            className="rounded-full border border-hairline px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          >
            Resume
          </a>
        ) : (
          <span
            title="Resume PDF coming soon"
            className="cursor-not-allowed rounded-full border border-hairline px-3 py-1.5 text-xs font-medium text-ink-muted opacity-70"
          >
            Resume · soon
          </span>
        )}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-display text-3xl leading-tight text-foreground md:text-4xl">
              Still building.
              <br />
              Still learning.
              <br />
              Still shipping.
            </p>
            <p className="mt-6 text-sm text-ink-muted">See you in the next commit.</p>
            <pre className="mt-4 inline-block rounded-md bg-surface-elevated px-3 py-2 font-mono text-xs text-ink-muted">
              <span className="text-brand">$</span> git commit -m &quot;keep building&quot;
            </pre>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="flex gap-4 text-sm text-ink-muted">
              <a href="https://github.com/vibhormishra1" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a>
              <a href="https://www.linkedin.com/in/vibhormishra1/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a>
              <a href="mailto:vibhormishra0705@gmail.com" className="hover:text-foreground">Email</a>
            </div>
            <p className="font-mono text-xs text-ink-muted">
              © {new Date().getFullYear()} Vibhor Mishra
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  as = "h2",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <div id={id} className="mb-12 max-w-2xl scroll-mt-28">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
      <Heading className="mt-3 font-display text-3xl leading-tight text-foreground md:text-5xl">{title}</Heading>
      {description && <p className="mt-4 text-base text-ink-muted md:text-lg">{description}</p>}
    </div>
  );
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="hairline rounded-2xl border-dashed p-8 text-sm text-ink-muted">
      <span className="font-mono text-xs text-brand">TODO</span> — {label}
    </div>
  );
}
