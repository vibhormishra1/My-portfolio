# VEDA — Building a Multi-Agent Career Simulation Platform

**How we designed LLM personas that argue, plan, and learn together—without breaking consistency.**

---

I wanted to understand multi-agent systems by building something alive. Not a chatbot that switches personalities with a prompt edit, but agents that _maintain_ personas, argue with each other, and improve their decisions over time.

So I built VEDA: a simulation where four LLM agents—a product manager, senior engineer, client, and junior developer—run a full engineering sprint. They have memory, distinct objectives, and disagreements.

## Designing Agent Personas

The hardest part wasn't the LLMs. It was persona design.

Each agent gets a system prompt that's functionally a _constitution_—not just "be a PM," but "optimize for user engagement and be skeptical of scope creep." The senior engineer minimizes technical risk; the junior developer asks questions that often surface flaws. The client cares about deadline and budget.

We chained these system prompts with in-context examples. Every few messages, we'd include a reference conversation showing how that persona makes decisions. This matters. Without examples, personas drift. With them, Claude stays consistent across 50+ message exchanges.

## The Toughest Problem: State Consistency

Simulating a sprint means tracking state: which features are "in progress," who's unblocked, what the team agreed on yesterday. We centralized this in Firebase Realtime Database.

The naive approach: each agent queries the full state before responding. Fast in testing, catastrophic in production. Agents would read the same "incomplete feature" and both assign themselves to it.

We switched to a write-optimized model: agents read a _partial_ state view (their assigned tasks + recent messages) and commit their decisions as Firebase transactions. If two agents collide, the later write wins—and we log it as a "decision conflict" that the coordination agent must resolve.

This is deliberately imperfect. Real teams have conflicts; synchronous locking would break realism.

## Inter-Agent Communication

Agents don't call each other directly. They broadcast to a shared conversation history. Each message has metadata: sender, timestamp, intent (e.g., "propose_feature" or "raise_concern"). Agents poll every 30 seconds for new messages and respond asynchronously.

This buys us a few things:

- **Decoupling**: No agent waits for another's response. Conversations flow naturally.
- **Auditability**: Every decision is logged with reasoning.
- **Parallelism**: We can run 10 sprints simultaneously without coordination overhead.

The trade-off: agents miss nuance. The senior engineer might suggest a rewrite; the PM reads the message 2 minutes later and proposes a patch instead. No real-time discussion—just asynchronous proposals and rebuttals.

We accept this. Human teams do the same over async Slack.

## Sprint Planning & Memory

We structured a sprint as discrete phases: planning → implementation → review → retro. Each phase is a bounded conversation with explicit exit criteria.

Memory was the hard part. Agents need to remember:

- What they committed to last sprint
- Why certain technical decisions were made
- What the client's actual priority is (vs. what they _said_ initially)

We stored conversation summaries in Firebase (updated after each phase) and included them in every agent's context window. Not perfect recall—but enough.

## What Broke in Testing

**1. PM Scope Creep.** Early on, the PM agent kept approving feature requests from the client. We added an explicit constraint: "Reject 30% of requests, with reasoning." Suddenly, the PM became a filter, not a yes-person.

**2. Junior Developer Over-Deference.** The junior developer would accept the senior engineer's suggestions without question. We added a rule: "Ask at least one clarifying question per decision, even if you agree." This made conversations richer.

**3. False Consensus.** All four agents would agree too easily. We added an _adversary role_—a hidden constraint that forces the PM to play skeptic in every planning meeting. Conflict emerged naturally.

## Why This Matters

VEDA isn't a toy. It's a testbed for multi-agent orchestration patterns. If you can simulate a real team convincingly, you can:

- Test how agents handle ambiguous requirements
- See which decision-making styles lead to rework
- Understand where communication breaks down
- Prototype real-world agent behaviors before deployment

We're using it to design better coordination mechanisms for crisis response (our MARG project) and real-time team simulations.

## Key Learnings

- **Personas need constraints, not just descriptions.** "Be a PM" is meaningless. "Reject scope creep" is actionable.
- **Async communication is harder than it looks.** Agents miss context, double-book themselves, and contradict each other. That's actually realistic—and you need systems to handle it.
- **Memory management scales linearly with token cost.** Every conversation summary in context is ~100 tokens. Trim aggressively.
- **Disagreement is a feature.** Agents that always agree are useless. Agents that argue and resolve their conflicts are closer to how real teams work.

## Closing Thoughts

Multi-agent systems aren't about training better models. They're about orchestration: how do you structure conversations so agents share context, commit to decisions, and learn from failure? VEDA is our sandbox for that.

Current focus: integrating RAG so agents can learn from past sprints, and OpenAI Agents SDK to give them real tool-use capability. The goal is a simulation that's indistinguishable from a junior engineering team—mistakes, breakthroughs, and all.
