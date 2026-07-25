import { motion, useReducedMotion } from "framer-motion";
import { portfolio } from "@/data/portfolio-data";
import { AgentNodes } from "./AgentNodes";

const words = ["reason", "plan", "coordinate", "learn", "deploy"];

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_oklab,var(--brand)_10%,transparent),transparent_70%)]" />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1.15fr_1fr] md:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-brand align-middle" />
            available for internships & research collaborations
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-[2.5rem] leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            Building AI systems
            <br />
            that <RotatingWord />,
            <br />
            <span className="text-ink-muted">collaborate,</span>
            <br />
            <span className="text-ink-muted">and solve real-world problems.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 max-w-xl text-base text-ink-muted md:text-lg"
          >
            I'm <span className="text-foreground">{portfolio.personal.name}</span> — a Computer
            Science undergraduate working on <span className="text-foreground">Agentic AI</span>,{" "}
            <span className="text-foreground">Multi-Agent Systems</span>,{" "}
            <span className="text-foreground">LLM Applications</span>,{" "}
            <span className="text-foreground">Backend Engineering</span>, and{" "}
            <span className="text-foreground">Full-Stack Development</span>. Building products from
            research to production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
            >
              View Projects →
            </a>
            {portfolio.personal.resumeUrl ? (
              <a
                href={portfolio.personal.resumeUrl}
                download="Vibhor_Mishra_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Download Resume
              </a>
            ) : (
              <span
                title="Resume PDF coming soon — check back shortly."
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-sm font-medium text-ink-muted opacity-70"
              >
                Resume coming soon
              </span>
            )}
            <a
              href={portfolio.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              GitHub
            </a>
            <a
              href={portfolio.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-square w-full max-w-md justify-self-center md:justify-self-end"
        >
          <AgentNodes />
        </motion.div>
      </div>
    </section>
  );
}

function RotatingWord() {
  const reduced = useReducedMotion();
  return (
    <span className="relative inline-block align-baseline">
      <span className="invisible whitespace-nowrap">{words[0]}</span>
      <span className="absolute inset-0">
        {words.map((w, i) => (
          <motion.span
            key={w}
            className="absolute inset-0 whitespace-nowrap bg-gradient-to-r from-brand to-brand-muted bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={
              reduced
                ? { opacity: i === 0 ? 1 : 0 }
                : {
                    opacity: [0, 1, 1, 0],
                    y: [20, 0, 0, -20],
                  }
            }
            transition={{
              duration: words.length * 2,
              times: [
                i / words.length,
                (i + 0.05) / words.length,
                (i + 0.95) / words.length,
                (i + 1) / words.length,
              ],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {w}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
