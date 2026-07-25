import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio-data";
import { SectionHeading } from "./Chrome";

type Line = { kind: "in" | "out"; text: string };

const COMMANDS = [
  "about",
  "projects",
  "resume",
  "contact",
  "skills",
  "github",
  "help",
  "clear",
] as const;
type Cmd = (typeof COMMANDS)[number];

function runCommand(cmd: string): string[] {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "about":
      return [
        `${portfolio.personal.name} — ${portfolio.personal.role}`,
        portfolio.personal.tagline,
      ];
    case "projects":
      return portfolio.projects.map((p) => `• ${p.name} — ${p.tagline}`);
    case "resume":
      return [`Downloading resume → ${portfolio.personal.resumeUrl}`];
    case "contact":
      return [
        `email    ${portfolio.personal.email}`,
        `github   ${portfolio.socials.github}`,
        `linkedin ${portfolio.socials.linkedin}`,
      ];
    case "skills":
      return [
        ...Array.from(new Set(portfolio.skills.map((s) => s.group))).map(
          (g) =>
            `${g}: ${portfolio.skills
              .filter((s) => s.group === g)
              .map((s) => s.label)
              .join(", ")}`,
        ),
      ];
    case "github":
      return [`Opening ${portfolio.socials.github}`];
    case "help":
      return [`available commands: ${COMMANDS.join(", ")}`];
    case "clear":
      return ["__CLEAR__"];
    case "":
      return [];
    default:
      return [`command not found: ${cmd} — try 'help'`];
  }
}

export function ContactTerminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: `Welcome. Type 'help' to see available commands.` },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const submit = (raw: string) => {
    const cmd = raw.trim();
    const out = runCommand(cmd);
    if (out[0] === "__CLEAR__") {
      setLines([]);
    } else {
      setLines((prev) => [
        ...prev,
        { kind: "in", text: cmd },
        ...out.map<Line>((t) => ({ kind: "out", text: t })),
      ]);
    }
    if (cmd) setHistory((h) => [cmd, ...h]);
    setHistoryIdx(-1);
    if (cmd === "resume") window.location.href = portfolio.personal.resumeUrl;
    if (cmd === "github") window.open(portfolio.socials.github, "_blank");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : (history[next] ?? ""));
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Talk to the terminal"
        description="Type a command — try 'about', 'projects', 'contact', or 'help'. Tab to autocomplete, ↑/↓ for history."
        id="contact"
      />

      <div
        onClick={() => inputRef.current?.focus()}
        className="hairline rounded-2xl bg-black/60 p-4 font-mono text-sm shadow-[0_20px_60px_-30px_var(--brand)]"
      >
        <div className="mb-3 flex items-center gap-2 border-b border-hairline pb-2 text-xs text-ink-muted">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3">visitor@portfolio — zsh</span>
        </div>
        <div ref={boxRef} className="max-h-[280px] min-h-[200px] overflow-y-auto pr-2">
          {lines.map((l, i) =>
            l.kind === "in" ? (
              <div key={i} className="text-foreground">
                <span className="text-brand">visitor@portfolio</span>
                <span className="text-ink-muted">:~$ </span>
                <span>{l.text}</span>
              </div>
            ) : (
              <div key={i} className="whitespace-pre-wrap text-ink-muted">
                {l.text}
              </div>
            ),
          )}
          <div className="mt-1 flex items-center">
            <span className="text-brand">visitor@portfolio</span>
            <span className="text-ink-muted">:~$&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              autoFocus
              spellCheck={false}
              className="flex-1 bg-transparent text-foreground outline-none"
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>

      {/* Accessibility fallback */}
      <div className="mt-6 grid gap-3 text-sm text-ink-muted md:grid-cols-3">
        <a
          href={`mailto:${portfolio.personal.email}`}
          className="hairline rounded-xl p-3 hover:bg-surface-elevated"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Email</p>
          <p className="mt-1 text-foreground">{portfolio.personal.email}</p>
        </a>
        <a
          href={portfolio.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hairline rounded-xl p-3 hover:bg-surface-elevated"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">GitHub</p>
          <p className="mt-1 text-foreground">@{portfolio.personal.handle}</p>
        </a>
        <a
          href={portfolio.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hairline rounded-xl p-3 hover:bg-surface-elevated"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">LinkedIn</p>
          <p className="mt-1 text-foreground">/in/vibhormishra1</p>
        </a>
      </div>
    </section>
  );
}
