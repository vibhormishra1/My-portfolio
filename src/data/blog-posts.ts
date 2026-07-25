import { BlogPost } from "./portfolio-types";

import post1 from "../content/blog/1-kachra-seth.md?raw";
import post2 from "../content/blog/2-veda-multi-agent.md?raw";
import post3 from "../content/blog/3-marg-crisis-response.md?raw";
import post4 from "../content/blog/4-iris-attendance.md?raw";
import post5 from "../content/blog/5-skillbridge-voice-first.md?raw";
import post6 from "../content/blog/6-dhara-gamification.md?raw";
import post7 from "../content/blog/7-agentic-ai-guide.md?raw";
import post8 from "../content/blog/8-multi-agent-systems.md?raw";
import post9 from "../content/blog/9-ai-scaling.md?raw";
import post10 from "../content/blog/10-prompt-to-agent-engineering.md?raw";
import post11 from "../content/blog/11-hackathon-lessons.md?raw";
import post12 from "../content/blog/12-rag-limitations.md?raw";
import post13 from "../content/blog/13-ai-system-design.md?raw";
import post14 from "../content/blog/14-demos-vs-products.md?raw";

export const blogPosts: BlogPost[] = [
  {
    slug: "kachra-seth",
    title: "Kachra Seth — Building an AI-Powered Urban Waste Management Platform",
    excerpt:
      "Won ₹16,000 at Anveshana 2025. A three-layer SaaS for municipal waste: AI classification (DenseNet201), QR tracking, and route optimization (Dijkstra + Genetic Algorithm).",
    date: "2025-04-01",
    tags: ["Computer Vision", "Route Optimization", "Municipal SaaS", "Hackathon"],
    body: post1,
  },
  {
    slug: "veda-multi-agent",
    title: "VEDA — Building a Multi-Agent Career Simulation Platform",
    excerpt:
      "Four LLM personas (PM, senior engineer, client, junior dev) run a full engineering sprint with distinct objectives, memory, and disagreements.",
    date: "2026-01-20",
    tags: ["Agent Personas", "LangChain", "Multi-Agent", "Shared State"],
    body: post2,
  },
  {
    slug: "marg-crisis-response",
    title: "MARG — Building a Neurosymbolic Multi-Agent Crisis Response Platform",
    excerpt:
      "Google Solution Challenge 2026 entry. Four specialized agents operating on a Firebase RTDB state machine with a deterministic rule engine.",
    date: "2026-02-05",
    tags: ["Neurosymbolic AI", "FastAPI", "Firebase", "Crisis Response"],
    body: post3,
  },
  {
    slug: "iris-attendance",
    title: "IRIS — Designing an AI Attendance System with Facial Recognition and LLM Queries",
    excerpt:
      "Biometric attendance (DeepFace + 30-second JWT QR codes) + LLM query layer for faculty analytics.",
    date: "2025-11-10",
    tags: ["Biometrics", "DeepFace", "JWT", "LLM Analytics"],
    body: post4,
  },
  {
    slug: "skillbridge-voice-first",
    title: "SkillBridge — Building a Voice-First Internship Platform for Rural India",
    excerpt:
      "Progressive web app for voice-first job matching. Web Speech API + Redis caching + multilingual support (Hindi, Tamil, English).",
    date: "2025-09-15",
    tags: ["Accessibility", "Voice UI", "Web Speech API", "Multilingual"],
    body: post5,
  },
  {
    slug: "dhara-gamification",
    title: "DHARA — Gamifying Environmental Action",
    excerpt:
      "Gamified campus sustainability platform. React + TypeScript. Challenges tied to actual environmental impact (EPA data).",
    date: "2025-08-20",
    tags: ["Gamification", "Product Design", "React", "Sustainability"],
    body: post6,
  },
  {
    slug: "what-is-agentic-ai",
    title: "What is Agentic AI? A Developer's Guide to Autonomous LLM Systems",
    excerpt:
      "Technical primer on agents. Planning, tools, memory, orchestration. How agents differ from chatbots. Building your first agent loop.",
    date: "2026-01-15",
    tags: ["Agentic AI", "Planning", "Tool Calling", "Orchestration"],
    body: post7,
  },
  {
    slug: "multi-agent-systems",
    title: "Why Multi-Agent Systems Are the Next Layer of AI Applications",
    excerpt:
      "Three coordination patterns: centralized dispatcher, decentralized + shared state, hierarchical with rules. Shared state as coordination substrate.",
    date: "2026-04-18",
    tags: ["Multi-Agent", "Coordination", "System Design", "Architecture"],
    body: post8,
  },
  {
    slug: "ai-scaling",
    title: "Building AI Applications That Actually Scale",
    excerpt:
      "Why demos work and productions break. Cost equations, cascading retries, hallucinations at scale, token explosion, cache invalidation.",
    date: "2026-05-02",
    tags: ["Scalability", "Cost Control", "Observability", "Production AI"],
    body: post9,
  },
  {
    slug: "prompt-to-agent-engineering",
    title: "From Prompt Engineering to Agent Engineering",
    excerpt:
      "Prompts optimize one forward pass. Systems optimize loops. Six layers: prompt, tools, state, routing, error handling, observability.",
    date: "2026-05-15",
    tags: ["Prompt Engineering", "Agent Design", "Tool Use", "State Management"],
    body: post10,
  },
  {
    slug: "hackathon-lessons",
    title: "Lessons from Building Hackathon Projects That Feel Like Startups",
    excerpt:
      "36-hour constraints force ruthless prioritization. MVP is narrative. Code quality can wait. Demo matters more than system.",
    date: "2026-06-01",
    tags: ["Hackathons", "MVP Design", "Product Strategy", "Shipping"],
    body: post11,
  },
  {
    slug: "rag-limitations",
    title: "RAG Isn't Enough: Designing AI Systems That Can Reason",
    excerpt:
      "RAG grounds LLMs but doesn't make them reason. Multi-hop reasoning, inference, contradiction resolution. From RAG to reasoning-augmented systems.",
    date: "2026-06-18",
    tags: ["RAG", "Reasoning", "Knowledge Graphs", "LLM Limitations"],
    body: post12,
  },
  {
    slug: "ai-system-design",
    title: "How I Design AI Systems Before Writing a Single Line of Code",
    excerpt:
      "10-step design framework: map the loop, define failures, define state, define roles, communication patterns, observability, constraints.",
    date: "2026-07-02",
    tags: ["System Design", "Architecture", "Failure Modes", "Frameworks"],
    body: post13,
  },
  {
    slug: "demos-vs-products",
    title: "The Difference Between AI Demos and Production AI Products",
    excerpt:
      "Why demos succeed and products fail. Input variance, data variance, scale, real failures. Five gaps: validation, error handling, observability.",
    date: "2026-07-20",
    tags: ["Production", "Resilience", "Error Handling", "MLOps"],
    body: post14,
  },
];
