export type Social = {
  github: string;
  linkedin: string;
  email: string;
  twitter?: string;
};

export type Personal = {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  location?: string;
  email: string;
  resumeUrl: string;
  avatarUrl?: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  tag?: string;
};

export type CurrentlyBuilding = {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  milestone: string;
  /** GitHub repo `owner/name` — powers live commit/updated data */
  repo?: string;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  layer: "client" | "gateway" | "service" | "agent" | "data" | "external" | "infra";
  description?: string;
};

export type ArchitectureEdge = { from: string; to: string; label?: string };

export type ArchitectureView = {
  id: string;
  title: string;
  summary?: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: "AI Systems" | "Software Products" | "Research" | "Open Source" | "Experiments";
  status?: "Shipped" | "In Progress" | "Prototype" | "Research";
  year?: string;
  overview?: string;
  problem?: string;
  gapsInExistingSolutions?: string;
  approach?: string;
  engineeringDecisions?: string[];
  tradeoffs?: string[];
  challenges?: string[];
  lessons?: string[];
  futureWork?: string[];
  keyFeatures?: string[];
  stack: string[];
  screenshots?: { src: string; alt: string }[];
  architecture?: ArchitectureView[];
  links?: { github?: string; demo?: string };
};

export type ResearchInterest = { title: string; blurb?: string };

export type Skill = {
  id: string;
  /** Display label */
  label: string;
  /** Cluster label — any string; used for coloring/filtering */
  group: string;
  description?: string;
};

export type SkillEdge = [string, string];

export type Experience = {
  company: string;
  role: string;
  start: string;
  end?: string;
  bullets?: string[];
  stack?: string[];
  location?: string;
};

export type Education = {
  school: string;
  degree: string;
  start: string;
  end?: string;
  notes?: string;
};

export type Hackathon = {
  name: string;
  year: string;
  result?: string;
  project?: string;
  link?: string;
};

export type IndustrySim = { name: string; provider: string; year?: string; notes?: string };

export type Certification = {
  name: string;
  issuer: string;
  category:
    | "AI & Agentic AI"
    | "Programming"
    | "Cloud"
    | "Software Engineering"
    | "Industry Simulations"
    | "Hackathons";
  year?: string;
  url?: string;
};

export type Achievement = { title: string; note?: string; year?: string };
export type Publication = { title: string; venue?: string; year?: string; url?: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  body: string;
};

export type SystemDesignArea = { title: string; description: string };

export type PortfolioData = {
  personal: Personal;
  socials: Social;
  mission: string;
  timeline: TimelineItem[];
  currentlyBuilding: CurrentlyBuilding[];
  projects: Project[];
  highlights: string[];
  research: ResearchInterest[];
  systemDesignAreas: SystemDesignArea[];
  skills: Skill[];
  skillEdges: SkillEdge[];
  experience: Experience[];
  education: Education[];
  hackathons: Hackathon[];
  industrySims: IndustrySim[];
  certifications: Certification[];
  achievements: Achievement[];
  publications: Publication[];
  blog: BlogPost[];
  aiPlaygroundResponses: { q: string; a: string }[];
};
