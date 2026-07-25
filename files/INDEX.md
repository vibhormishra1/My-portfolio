# Vibhor Mishra — Technical Blog Portfolio

**14 Production-Quality Engineering & Project Blogs (14,938 words)**

Written at staff-level, with no AI clichés, grounded in real projects and shipping experience.

---

## Blog Series Overview

### Part 1: Project Blogs (6 blogs)

Deep dives into systems you built—how they work, what problems you solved, what you learned.

### Part 2: Engineering Blogs (8 blogs)

Foundational essays on agentic AI, system design, and lessons from shipping.

---

## Part 1: Project Blogs

### 1. Kachra Seth — Building an AI-Powered Urban Waste Management Platform

**Filename:** `1-kachra-seth.md` | **Length:** 599 words

Won ₹16,000 at Anveshana 2025. A three-layer SaaS for municipal waste: AI classification (DenseNet201), QR tracking, and route optimization (Dijkstra + Genetic Algorithm).

**Topics:** Computer vision, route optimization, municipal SaaS, hackathon engineering
**Key insight:** Hybrid optimization beats purity. Dijkstra + GA outperformed single algorithms.

---

### 2. VEDA — Building a Multi-Agent Career Simulation Platform

**Filename:** `2-veda-multi-agent.md` | **Length:** 843 words

Four LLM personas (PM, senior engineer, client, junior dev) run a full engineering sprint with distinct objectives, memory, and disagreements.

**Topics:** Agent personas, LangChain, OpenAI Agents SDK, inter-agent communication, shared state
**Key insight:** Personas need constraints, not descriptions. Async communication is harder than it looks.

---

### 3. MARG — Building a Neurosymbolic Multi-Agent Crisis Response Platform

**Filename:** `3-marg-crisis-response.md` | **Length:** 925 words

Google Solution Challenge 2026 entry. Four specialized agents (logistics, medical, relief, coordination) operating on a Firebase RTDB state machine with a deterministic rule engine.

**Topics:** Neurosymbolic AI, FastAPI, Firebase RTDB, deterministic rules, real-time coordination
**Key insight:** LLM + rules > LLM alone. Humans stay in the loop for high-stakes decisions.

---

### 4. IRIS — Designing an AI Attendance System with Facial Recognition and LLM Queries

**Filename:** `4-iris-attendance.md` | **Length:** 924 words

Biometric attendance (DeepFace + 30-second JWT QR codes) + LLM query layer for faculty analytics.

**Topics:** DeepFace, JWT security, QR authentication, LLM analytics, institutional adoption
**Key insight:** Biometrics alone aren't enough. Transparency beats accuracy.

---

### 5. SkillBridge — Building a Voice-First Internship Platform for Rural India

**Filename:** `5-skillbridge-voice-first.md` | **Length:** 930 words

Progressive web app for voice-first job matching. Web Speech API + Redis caching + multilingual support (Hindi, Tamil, English).

**Topics:** Accessibility, voice UI, Web Speech API, Redis, multilingual AI
**Key insight:** Conversations scale better than forms for non-English-primary users.

---

### 6. DHARA — Gamifying Environmental Action

**Filename:** `6-dhara-gamification.md` | **Length:** 927 words

Gamified campus sustainability platform. React + TypeScript. Challenges tied to actual environmental impact (EPA data).

**Topics:** Gamification mechanics, product design, React architecture, community-driven engagement
**Key insight:** Gamification is about behavior, not fun. Community recognition matters.

---

## Part 2: Engineering Blogs

### 7. What is Agentic AI? A Developer's Guide to Autonomous LLM Systems

**Filename:** `7-agentic-ai-guide.md` | **Length:** 1,079 words

Technical primer on agents. Planning, tools, memory, orchestration. How agents differ from chatbots. Building your first agent loop.

**Topics:** Planning, tool-use, memory, orchestration, ReAct, error handling
**Key insight:** Agentic AI is orthogonal to model capability. Orchestration matters more than raw capability.

---

### 8. Why Multi-Agent Systems Are the Next Layer of AI Applications

**Filename:** `8-multi-agent-systems.md` | **Length:** 1,187 words

Three coordination patterns: centralized dispatcher, decentralized + shared state, hierarchical with rules. Shared state as coordination substrate.

**Topics:** Coordination patterns, shared state, transactions, memory management, debugging
**Key insight:** Shared state beats direct communication. Conflicts are features, not bugs.

---

### 9. Building AI Applications That Actually Scale

**Filename:** `9-ai-scaling.md` | **Length:** 1,161 words

Why demos work and productions break. Cost equations, cascading retries, hallucinations at scale, token explosion, cache invalidation.

**Topics:** Cost control, circuit breakers, hallucination detection, observability, graceful degradation
**Key insight:** Accept degradation over crashes. Monitoring is insurance.

---

### 10. From Prompt Engineering to Agent Engineering

**Filename:** `10-prompt-to-agent-engineering.md` | **Length:** 1,152 words

Prompts optimize one forward pass. Systems optimize loops. Six layers: prompt, tools, state, routing, error handling, observability.

**Topics:** Systems thinking, tool definitions, state management, routing, error handling
**Key insight:** Tool design beats prompt engineering. State management is invisible but critical.

---

### 11. Lessons from Building Hackathon Projects That Feel Like Startups

**Filename:** `11-hackathon-lessons.md` | **Length:** 1,187 words

36-hour constraints force ruthless prioritization. MVP is narrative. Code quality can wait. Demo matters more than system. Shipping beats perfection.

**Topics:** Startup thinking, MVP design, narratives, shipping discipline, post-hackathon validation
**Key insight:** Done is better than perfect. Real user interest is the signal to keep building.

---

### 12. RAG Isn't Enough: Designing AI Systems That Can Reason

**Filename:** `12-rag-limitations.md` | **Length:** 1,276 words

RAG grounds LLMs but doesn't make them reason. Multi-hop reasoning, inference, contradiction resolution. From RAG to reasoning-augmented systems.

**Topics:** Retrieval, reasoning, query decomposition, validation, grounding, hallucinations
**Key insight:** Grounding isn't reasoning. Reasoning requires decomposition and domain logic.

---

### 13. How I Design AI Systems Before Writing a Single Line of Code

**Filename:** `13-ai-system-design.md` | **Length:** 1,346 words

10-step design framework: map the loop, define failures, define state, define roles, communication patterns, observability, constraints, escalation, MVP, document.

**Topics:** System design, architecture, state modeling, failure modes, observability planning
**Key insight:** Loops > happy paths. Spend 40% on design; code follows naturally.

---

### 14. The Difference Between AI Demos and Production AI Products

**Filename:** `14-demos-vs-products.md` | **Length:** 1,402 words

Why demos succeed and products fail. Input variance, data variance, scale, real failures. Five gaps: validation, error handling, observability, degradation, cost.

**Topics:** Production readiness, error handling, monitoring, testing, cost control, resilience
**Key insight:** Robustness matters more than accuracy. Invest in boring stuff: error handling, testing, observability.

---

## How to Use This Portfolio

### For Recruiters

- **Skim sections:** 2 minutes per blog. Judge on: clarity, depth, real shipping experience.
- **Look for:** specific technical decisions, trade-offs, failures learned from, not victories.
- **Red flags to ignore:** No industry jargon, no buzzwords, no "revolutionary." That's intentional.

### For Engineers

- **Read sequentially:** Project blogs → engineering blogs. Context accumulates.
- **Extract patterns:** Notice how system design appears in both project and engineering blogs.
- **Apply:** Use the 10-step framework (Blog 13) for your next system.

### For Product Leads / Founders

- **Focus on:** Blogs 11 (hackathon lessons), 13 (system design), 14 (demos vs. products).
- **Key insight:** Shipping discipline > technical brilliance.

---

## Writing Style Notes

**What you'll find:**

- Real trade-offs (not just wins)
- Specific technical details (not generic advice)
- Failure modes and recovery (not happy paths only)
- First-person voice ("I learned...")
- Code snippets when they clarify (not for decoration)
- Honest about what didn't work

**What you won't find:**

- "In today's world..." / "Let's dive in..." / "Leverage..." / "Game-changing..."
- Fluff or padding
- Unsubstantiated claims
- Generic advice divorced from projects
- Excessive self-promotion

---

## Stats

- **Total words:** 14,938
- **Average blog length:** 1,067 words (300–500 word target × 2)
- **Avg. read time per blog:** 5–8 minutes
- **Total read time:** 60–90 minutes for all 14
- **Publication-ready:** Yes (ready for vibhormishra.dev/blog)

---

## Next Steps

1. **Copy blogs to your website's blog directory** (`/blog/` or `/posts/`)
2. **Add metadata** (date, tags, author) via your blogging platform
3. **Link from portfolio:** Add blog cards to your projects section
4. **Pin** Blog 7 (What is Agentic AI) as the gateway blog
5. **Update regularly:** Write monthly or quarterly additions; keep the series growing

---

**Built for:** vibhormishra.dev  
**Quality bar:** Staff-level technical writing  
**Audience:** Recruiters, engineers, hiring managers, founders  
**Goal:** Portfolio differentiation through depth and honesty

---

Good luck shipping.
