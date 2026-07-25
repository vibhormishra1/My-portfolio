import type { PortfolioData } from "./portfolio-types";
import { blogPosts } from "./blog-posts";
import resumeAsset from "@/assets/resume.pdf.asset.json";

// Single source of truth. Content sourced from Vibhor's resume + LinkedIn + GitHub.
// Empty arrays render as tasteful empty states — never fabricate content.

export const portfolio: PortfolioData = {
  personal: {
    name: "Vibhor Mishra",
    handle: "vibhormishra1",
    role: "AI Systems Engineer",
    tagline:
      "AI Systems Engineer building multi-agent orchestration systems, LLM-powered backends, and Agentic AI pipelines. Focused on agent coordination protocols, RAG architectures, and real-time distributed state — from research prototype to production.",
    location: "Bhopal, Madhya Pradesh, India",
    email: "vibhormishra0705@gmail.com",
    // Empty until a PDF is uploaded to /public/resume.pdf — button renders a graceful placeholder.
    resumeUrl: resumeAsset.url,
  },
  socials: {
    github: "https://github.com/vibhormishra1",
    linkedin: "https://www.linkedin.com/in/vibhormishra1/",
    email: "mailto:vibhormishra0705@gmail.com",
  },
  mission:
    "I care about the systems behind intelligent software — the reasoning loops, the data plumbing, and the guardrails that make an agent actually useful in production. My work sits between research and engineering: designing multi-agent architectures, then wiring them into real backends with FastAPI, Firebase, and Python that ship.",

  timeline: [
    {
      year: "2023",
      title: "Started B.Tech CSE at SIRT",
      description: "Foundations in DSA, OS, DBMS, and software engineering.",
      tag: "Education",
    },
    {
      year: "2023",
      title: "AI Intern at RineX.Ai",
      description:
        "Built end-to-end ML pipelines with PyTorch and scikit-learn; early exposure to GenAI architectures.",
      tag: "AI",
    },
    {
      year: "2024",
      title: "IIT Mandi Minor in CSE",
      description: "Advanced technologies minor via CCE × NSDC × Masai School.",
      tag: "Education",
    },
    {
      year: "2025",
      title: "Agentic AI focus",
      description: "Multi-agent orchestration, LLM integration, and neurosymbolic reasoning.",
      tag: "Research",
    },
    {
      year: "2026",
      title: "Shipping production AI systems",
      description: "VEDA, MARG (Google Solution Challenge), IRIS, DHARA (SIH).",
      tag: "Shipping",
    },
  ],

  currentlyBuilding: [
    {
      slug: "veda",
      name: "VEDA",
      tagline: "Multi-Agent AI Career Simulation Platform",
      status: "In Progress",
      milestone: "RAG integration with OpenAI Agents SDK + persona orchestration",
      repo: "vibhormishra1/VEDA",
    },
    {
      slug: "marg",
      name: "MARG",
      tagline: "Neurosymbolic Multi-Agent Crisis Response System",
      status: "In Progress",
      milestone: "Google Solution Challenge 2026 — Gemini 2.0 Flash + Firebase RTDB state machine",
      repo: "vibhormishra1/MARG",
    },
  ],

  highlights: ["veda", "marg", "iris", "dhara"],

  projects: [
    {
      slug: "veda",
      name: "VEDA",
      tagline: "Multi-Agent AI Career Simulation Platform",
      category: "AI Systems",
      status: "In Progress",
      stack: ["Python", "FastAPI", "LangChain", "OpenAI Agents SDK", "Firebase", "React"],
      overview:
        "A multi-agent simulation where LLM-powered agents (PM, senior engineer, client, junior developer) operate with distinct personas, inter-agent messaging protocols, and shared conversation memory to recreate real engineering workflows.",
      approach:
        "Persona consistency via system-prompt chaining and a turn-taking orchestration protocol. A scenario-injection API lets curriculum designers configure simulation parameters at runtime. Shares the orchestration engine with MARG.",
      engineeringDecisions: [
        "System-prompt chaining for persona stability across long conversations.",
        "Turn-taking orchestration protocol over shared memory instead of ad-hoc broadcasts.",
        "Versioned REST endpoints for agent state, session history, and scenario management.",
      ],
      keyFeatures: [
        "Distinct LLM personas with inter-agent messaging",
        "Scenario injection API for curriculum designers",
        "Shared conversation memory across agents",
      ],
      links: { github: "https://github.com/vibhormishra1/VEDA" },
      architecture: [],
    },
    {
      slug: "marg",
      name: "MARG",
      tagline: "Neurosymbolic Multi-Agent Crisis Response System",
      category: "AI Systems",
      status: "In Progress",
      year: "2026",
      stack: [
        "Python",
        "FastAPI",
        "Gemini 2.0 Flash",
        "Firebase RTDB",
        "React",
        "TypeScript",
        "Railway",
      ],
      overview:
        "Google Solution Challenge 2026 entry. Four specialized LLM agents — logistics, medical, relief, coordination — operate on a shared Firebase RTDB state machine with a deterministic rule engine for conflict resolution.",
      approach:
        "Hybrid LLM + rule-based reasoning prevents hallucination in safety-critical decision paths. Async FastAPI backend with an agent dispatcher and inter-agent negotiation protocol; real-time React dashboard; deployed on Railway with Firebase RTDB as the distributed shared state.",
      engineeringDecisions: [
        "Neurosymbolic architecture: LLM reasoning gated by a deterministic rule engine.",
        "Firebase RTDB as a shared state machine across four agent processes.",
        "Agent memory module for context retention across multi-turn coordination.",
      ],
      keyFeatures: [
        "Four specialized crisis-response agents",
        "Deterministic conflict-resolution rule engine",
        "Real-time React dashboard for human oversight",
      ],
      links: { github: "https://github.com/vibhormishra1/MARG" },
      architecture: [],
    },
    {
      slug: "iris",
      name: "IRIS",
      tagline: "AI Attendance System with LLM Query Interface",
      category: "Software Products",
      status: "Shipped",
      stack: ["Python", "FastAPI", "DeepFace", "Firebase", "Node.js", "JWT", "React"],
      overview:
        "Biometric attendance backend using DeepFace (RetinaFace + ArcFace) with rotating RS256 JWT-signed QR fallbacks — tokens expire in 30 seconds to prevent screenshot and replay attacks.",
      approach:
        "IRIS-LLM translates faculty questions into Firestore queries via an LLM pipeline, eliminating manual report generation. FastAPI exposes 15+ REST endpoints for attendance marking, role-based access, reporting, and analytics; Firebase Auth handles multi-role identity.",
      keyFeatures: [
        "Facial recognition with RetinaFace + ArcFace",
        "Rotating RS256 JWT-signed QR fallback (30s TTL)",
        "Natural-language query layer over Firestore",
      ],
      links: { github: "https://github.com/vibhormishra1/IRIS" },
      architecture: [],
    },
    {
      slug: "skill-bridge",
      name: "Skill Bridge",
      tagline: "Voice-First Multilingual Internship Portal for Rural India",
      category: "Software Products",
      status: "Shipped",
      stack: [
        "React",
        "Vite",
        "FastAPI",
        "Python",
        "MongoDB",
        "Redis",
        "i18next",
        "Web Speech API",
      ],
      overview:
        "Full-stack PWA that connects rural youth to internship opportunities through a voice-first, multilingual (English/Hindi/Tamil) interface — designed for users with limited digital literacy.",
      approach:
        "Conversational voice onboarding captures name, skills, education, and location; a FastAPI matching engine scores profiles against a curated internship database, with Redis caching match scores and sessions. Traditional form fallback and high-contrast mobile-first UI keep the app accessible.",
      keyFeatures: [
        "Voice-first multi-step onboarding (react-speech-recognition)",
        "Trilingual UI and voice prompts via i18next",
        "FastAPI + MongoDB matching engine with Redis-backed scoring",
        "Installable PWA with accessible fallback form",
      ],
      links: {
        github: "https://github.com/akshayvarma121/skill-bridge",
        demo: "https://skill-bridge-ten-dusky.vercel.app/",
      },
      architecture: [],
    },
    {
      slug: "kachra-seth",
      name: "Kachra Seth",
      tagline: "AI-Powered Urban Waste Management Platform — Anveshana 2025 Winner",
      category: "AI Systems",
      status: "Shipped",
      year: "2025",
      stack: [
        "Python",
        "TensorFlow",
        "DenseNet201",
        "FastAPI",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Vite",
      ],
      overview:
        "A digital waste ecosystem for Indian municipalities. Citizens use an AI camera to classify waste into seven categories; sanitation workers scan QR codes on bins for verified collection; and municipalities track routes, complaints, and a Green Score that ranks ward performance. Won ₹16,000 at Anveshana 2025.",
      approach:
        "Built around a 3-layer architecture: Citizen Engagement (AI classification, reminders, rewards), Municipal Operations (live bin status, GPS tracking, QR proof-of-collection), and Analytics & Policy (Green Score, ward rankings, route optimization). A CNN based on DenseNet201, trained on 50,000+ Indian waste images, powers the classification module. Collection routes are optimized with Dijkstra's shortest path and a genetic algorithm for the vehicle-routing problem.",
      engineeringDecisions: [
        "DenseNet201 CNN for waste classification instead of a generic mobile classifier, to handle Indian waste categories and lighting conditions.",
        "QR-based bin IDs (₹10–50/bin) rather than expensive IoT sensors, making the system scalable across diverse urban budgets.",
        "Offline-first QR scanning so sanitation workers can log collections in low-connectivity areas and sync later.",
        "Green Score formula balancing segregation rate, participation, complaint-free days, and special challenges to drive municipal accountability.",
      ],
      keyFeatures: [
        "AI camera classifies waste into Plastic, Paper, Metal, Glass, Organic, E-waste, and Hazardous",
        "QR-based bin tracking with offline scanning and proof-of-collection",
        "Live bin status, vehicle GPS tracking, and AI-driven route optimization",
        "Green Score ward rankings with rewards and performance benchmarking",
      ],
      links: {
        github: "https://github.com/akshayvarma121/kachra-seth",
        demo: "https://kachra-seth.vercel.app/",
      },
      architecture: [],
    },
    {
      slug: "dhara",
      name: "DHARA",
      tagline: "Smart India Hackathon Eco-Challenge Platform",
      category: "Software Products",
      status: "Shipped",
      year: "2026",
      stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      overview:
        "DHARA is a student-facing eco-challenge platform built for Smart India Hackathon. Users complete fun sustainability challenges, track their environmental impact, and join a community working toward greener campuses.",
      approach:
        "Gamified challenge feed with progress tracking and impact visualization. Mobile-first React + Tailwind UI, deployed on Vercel for fast, reliable access during the hackathon demo.",
      engineeringDecisions: [
        "Vite + React for rapid prototyping and fast HMR during the hackathon.",
        "Tailwind-first design system to keep the UI consistent across challenge screens.",
        "Static deployment on Vercel for zero-config CI/CD and edge performance.",
      ],
      keyFeatures: [
        "Gamified eco-challenges with progress tracking",
        "Impact dashboard showing collective environmental contribution",
        "Mobile-first, accessible UI for student participation",
      ],
      links: { demo: "https://eco-rise.vercel.app/" },
      architecture: [],
    },
  ],

  research: [
    {
      title: "Agentic AI & Multi-Agent Systems",
      blurb: "Agent orchestration, planning, tool-use, and memory.",
    },
    {
      title: "Neurosymbolic AI",
      blurb: "Hybrid LLM + rule-based reasoning for safety-critical decisions.",
    },
    {
      title: "Retrieval-Augmented Generation",
      blurb: "Hybrid retrieval, evaluation, and grounding.",
    },
    {
      title: "LLM Application Design",
      blurb: "Prompt architectures, guardrails, and observability.",
    },
    {
      title: "Backend Systems for AI",
      blurb: "Async serving, distributed state, and real-time coordination.",
    },
  ],

  systemDesignAreas: [
    { title: "Distributed Systems", description: "Consistency, partitioning, and failure modes." },
    {
      title: "Event-driven Architecture",
      description: "Queues, streams, and eventual consistency.",
    },
    { title: "Vector Databases", description: "Indexing, hybrid search, and retrieval quality." },
    { title: "RAG Pipelines", description: "Chunking, re-ranking, evaluation, guardrails." },
    {
      title: "Agent Orchestration",
      description: "Planners, routers, memory, and human-in-the-loop.",
    },
    { title: "Backend Design", description: "API contracts, auth, jobs, and observability." },
    { title: "Database Design", description: "Normalization, indexes, and migrations." },
    {
      title: "Authentication",
      description: "Sessions, tokens, JWT rotation, and role-based access.",
    },
    { title: "API Design", description: "REST, RPC, and typed contracts." },
  ],

  skills: [
    // Languages
    { id: "python", label: "Python", group: "Languages" },
    { id: "java", label: "Java", group: "Languages" },
    { id: "ts", label: "TypeScript", group: "Languages" },
    { id: "js", label: "JavaScript", group: "Languages" },
    { id: "sql", label: "SQL", group: "Languages" },

    // Java ecosystem
    { id: "spring-boot", label: "Spring Boot", group: "Java Ecosystem" },
    { id: "kafka", label: "Apache Kafka", group: "Java Ecosystem" },
    { id: "jvm", label: "JVM", group: "Java Ecosystem" },
    { id: "dsa", label: "Data Structures & Algorithms", group: "Java Ecosystem" },
    { id: "software-eng", label: "Software Engineering", group: "Java Ecosystem" },
    { id: "jpmc-sim", label: "JPMorgan SWE Simulation", group: "Java Ecosystem" },

    // Python / AI
    { id: "fastapi", label: "FastAPI", group: "Python & AI" },
    { id: "ml", label: "Machine Learning", group: "Python & AI" },
    { id: "langchain", label: "LangChain", group: "Python & AI" },
    { id: "openai-agents", label: "OpenAI Agents SDK", group: "Python & AI" },
    { id: "rag", label: "RAG", group: "Python & AI" },
    { id: "pinecone", label: "Pinecone", group: "Python & AI" },
    { id: "faiss", label: "FAISS", group: "Python & AI" },
    { id: "numpy", label: "NumPy", group: "Python & AI" },
    { id: "pandas", label: "Pandas", group: "Python & AI" },
    { id: "pytorch", label: "PyTorch", group: "Python & AI" },
    { id: "gemini", label: "Gemini API", group: "Python & AI" },

    // Frontend
    { id: "react", label: "React", group: "Frontend" },
    { id: "next", label: "Next.js", group: "Frontend" },
    { id: "tanstack", label: "TanStack Start", group: "Frontend" },
    { id: "tailwind", label: "Tailwind CSS", group: "Frontend" },
    { id: "framer", label: "Framer Motion", group: "Frontend" },
    { id: "shadcn", label: "shadcn/ui", group: "Frontend" },

    // Node & APIs
    { id: "node", label: "Node.js", group: "Node & APIs" },
    { id: "express", label: "Express", group: "Node & APIs" },
    { id: "rest", label: "REST APIs", group: "Node & APIs" },
    { id: "webhooks", label: "GitHub Webhooks", group: "Node & APIs" },
    { id: "websockets", label: "WebSockets", group: "Node & APIs" },
    { id: "jwt", label: "JWT Auth", group: "Node & APIs" },

    // Data
    { id: "postgres", label: "PostgreSQL", group: "Databases" },
    { id: "supabase", label: "Supabase", group: "Databases" },
    { id: "oracle", label: "Oracle Database", group: "Databases" },
    { id: "firebase-rtdb", label: "Firebase RTDB", group: "Databases" },
    { id: "firestore", label: "Firestore", group: "Databases" },
    { id: "mongodb", label: "MongoDB", group: "Databases" },
    { id: "mysql", label: "MySQL", group: "Databases" },

    // DevOps
    { id: "git", label: "Git", group: "DevOps" },
    { id: "github", label: "GitHub", group: "DevOps" },
    { id: "github-actions", label: "GitHub Actions", group: "DevOps" },
    { id: "docker", label: "Docker", group: "DevOps" },
    { id: "railway", label: "Railway", group: "DevOps" },
  ],

  skillEdges: [
    // Java cluster
    ["java", "spring-boot"],
    ["java", "kafka"],
    ["java", "rest"],
    ["java", "jvm"],
    ["java", "dsa"],
    ["java", "software-eng"],
    ["java", "jpmc-sim"],
    ["spring-boot", "rest"],
    ["kafka", "software-eng"],

    // Python cluster
    ["python", "fastapi"],
    ["python", "ml"],
    ["python", "langchain"],
    ["python", "openai-agents"],
    ["python", "rag"],
    ["python", "pinecone"],
    ["python", "numpy"],
    ["python", "pandas"],
    ["python", "pytorch"],
    ["ml", "numpy"],
    ["ml", "pandas"],
    ["ml", "pytorch"],
    ["langchain", "rag"],
    ["langchain", "openai-agents"],
    ["rag", "pinecone"],
    ["rag", "faiss"],
    ["openai-agents", "gemini"],

    // React cluster
    ["react", "next"],
    ["react", "tanstack"],
    ["react", "tailwind"],
    ["react", "framer"],
    ["react", "shadcn"],
    ["next", "tailwind"],
    ["tanstack", "tailwind"],
    ["shadcn", "tailwind"],

    // Node cluster
    ["node", "express"],
    ["node", "ts"],
    ["node", "rest"],
    ["node", "webhooks"],
    ["express", "rest"],
    ["ts", "react"],
    ["ts", "next"],
    ["ts", "tanstack"],
    ["jwt", "rest"],
    ["websockets", "node"],

    // Databases cluster
    ["postgres", "supabase"],
    ["postgres", "sql"],
    ["oracle", "sql"],
    ["mysql", "sql"],
    ["firebase-rtdb", "firestore"],
    ["fastapi", "postgres"],
    ["fastapi", "firestore"],
    ["node", "mongodb"],

    // DevOps cluster
    ["git", "github"],
    ["git", "github-actions"],
    ["github", "github-actions"],
    ["github", "webhooks"],
    ["docker", "fastapi"],
    ["docker", "node"],
    ["railway", "docker"],
  ],

  experience: [
    {
      company: "RineX.Ai",
      role: "Artificial Intelligence Intern",
      start: "Nov 2023",
      end: "Dec 2023",
      location: "Bhopal, India",
      bullets: [
        "Designed and implemented end-to-end ML pipelines (supervised, unsupervised, deep learning) using Python, PyTorch, and scikit-learn — delivered 5 applied projects covering classification, clustering, and recommendation.",
        "Built Computer Vision and NLP preprocessing workflows using OpenCV and NLTK; early practical exposure to Generative AI architectures (GANs, Autoencoders, Transformers).",
        "Applied statistical modeling (hypothesis testing, probability distributions, inferential statistics) to real-world datasets for predictive modeling tasks.",
      ],
      stack: ["Python", "PyTorch", "scikit-learn", "OpenCV", "NLTK"],
    },
    {
      company: "Saksham Digital Technology",
      role: "Web Design Intern",
      start: "Jul 2024",
      end: "Jul 2024",
      location: "Bhopal, India",
      bullets: [
        "Built responsive web interfaces using HTML5, CSS3, and JavaScript; applied accessible UI patterns and cross-browser compatibility practices.",
      ],
      stack: ["HTML5", "CSS3", "JavaScript"],
    },
  ],

  education: [
    {
      school: "Sagar Institute of Research & Technology (SIRT), RGPV University",
      degree: "B.Tech, Computer Science & Engineering",
      start: "Aug 2023",
      end: "May 2027",
      notes:
        "Current CGPA (5th semester): 7.75. Coursework: Data Structures & Algorithms, OS, Computer Networks, DBMS, Software Engineering, OOP.",
    },
    {
      school: "IIT Mandi — CCE × NSDC × Masai School",
      degree: "Minor in CSE & Advanced Technologies",
      start: "Oct 2024",
      end: "2025",
      notes: "3/3 courses completed · ID: IITMCS_24093012.",
    },
  ],

  hackathons: [
    {
      name: "Google Solution Challenge 2026",
      year: "2026",
      result: "Participant",
      project: "MARG — Neurosymbolic Multi-Agent Crisis Response System",
    },
    {
      name: "Anveshana 2025 Inter-College Tech Fest",
      year: "2025",
      result: "Won ₹16,000",
      project: "Kachra Seth (AI waste management platform)",
    },
    {
      name: "SolveExpo'26 Startup Innovation Competition",
      year: "2026",
      result: "6th Rank",
      project: "JNCT Bhopal — AI & DS Department",
    },
    {
      name: "Tech-Sageathon 2K26",
      year: "2026",
      result: "4th Place · Won ₹2,000",
      project: "National-level hackathon, SIRT (May 2026)",
    },
    {
      name: "Dawn of Code Hackathon",
      year: "2025",
      result: "Participant",
      project: "VIT Bhopal (Sep 2025)",
    },
  ],

  industrySims: [
    {
      name: "Software Engineering",
      provider: "JPMorgan Chase & Co. (Forage)",
      year: "May 2026",
      notes:
        "Project setup, Apache Kafka integration, H2 in-memory DB, REST API design and controller implementation.",
    },
    {
      name: "Advanced Software Engineering",
      provider: "Walmart Global Tech (Forage)",
      year: "Jun 2026",
      notes:
        "Advanced data structures, software architecture design patterns, relational schema design, data munging.",
    },
    {
      name: "Software Engineering",
      provider: "Commonwealth Bank (Forage)",
      year: "Jun 2026",
      notes: "Website creation, financial cybersecurity fundamentals, web hosting proposal.",
    },
  ],

  certifications: [
    {
      name: "Oracle Certified Foundations Associate — Agentic AI",
      issuer: "Oracle University",
      category: "AI & Agentic AI",
      year: "2026",
    },
    {
      name: "RAG for Enhanced AI Outputs",
      issuer: "IBM SkillsBuild",
      category: "AI & Agentic AI",
      year: "2026",
    },
    {
      name: "Gemini Certified — University Student",
      issuer: "Google",
      category: "AI & Agentic AI",
      year: "2025",
    },
    {
      name: "ML Applications with Agentic AI",
      issuer: "SAGE Summer School",
      category: "AI & Agentic AI",
      year: "2026",
    },
    {
      name: "Agentic AI: Principles & Practice",
      issuer: "SAGE Winter School",
      category: "AI & Agentic AI",
      year: "2026",
    },
    {
      name: "NPTEL Elite — Programming in Java (83%)",
      issuer: "IIT Kharagpur",
      category: "Programming",
      year: "2025",
    },
    {
      name: "NPTEL — Database Management Systems",
      issuer: "IIT Kharagpur",
      category: "Programming",
      year: "2026",
    },
    {
      name: "DSA with Java — Alpha Course",
      issuer: "Apna College",
      category: "Programming",
      year: "2025",
    },
    {
      name: "JPMorgan Chase — Software Engineering",
      issuer: "Forage",
      category: "Industry Simulations",
      year: "2026",
    },
    {
      name: "Walmart Global Tech — Advanced Software Engineering",
      issuer: "Forage",
      category: "Industry Simulations",
      year: "2026",
    },
    {
      name: "Commonwealth Bank — Software Engineering",
      issuer: "Forage",
      category: "Industry Simulations",
      year: "2026",
    },
  ],

  achievements: [
    {
      title: "Won ₹16,000 — Kachra Seth (AI waste management platform), Anveshana 2025",
      year: "2025",
    },
    {
      title: "6th Rank — SolveExpo'26 Startup Innovation Competition, JNCT Bhopal (AI & DS Dept.)",
      year: "2026",
    },
    { title: "Participant — Google Solution Challenge 2026 (MARG project)", year: "2026" },
    {
      title: "4th Place · Won ₹2,000 — Tech-Sageathon 2K26, National-Level Hackathon, SIRT",
      year: "2026",
    },
  ],

  publications: [],
  blog: blogPosts,

  aiPlaygroundResponses: [
    {
      q: "What is VEDA?",
      a: "VEDA is a Multi-Agent AI Career Simulation Platform. LLM-powered agents (PM, senior engineer, client, junior developer) run distinct personas with a turn-taking orchestration protocol and shared conversation memory to recreate real engineering workflows.",
    },
    {
      q: "What is MARG?",
      a: "MARG is a Neurosymbolic Multi-Agent Crisis Response System — Google Solution Challenge 2026. Four specialized LLM agents (logistics, medical, relief, coordination) share a Firebase RTDB state machine with a deterministic rule engine that prevents hallucination in safety-critical paths.",
    },
    {
      q: "Explain your tech stack.",
      a: "Python + FastAPI for AI services, LangChain and the OpenAI Agents SDK for orchestration, Gemini 2.0 Flash for reasoning, FAISS/Pinecone for retrieval, PostgreSQL and Firebase for state, and React/TypeScript with Tailwind on the frontend. Railway, Docker, and GitHub Actions tie it together.",
    },
    {
      q: "What are your research interests?",
      a: "Agentic AI, Multi-Agent Systems, Neurosymbolic reasoning, RAG pipelines, LLM application design, and the backend systems that make them production-ready.",
    },
  ],
};
