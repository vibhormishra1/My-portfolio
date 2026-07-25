import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/portfolio/Chrome";
import { Hero } from "@/components/portfolio/Hero";
import {
  ImpactMetrics,
  CurrentlyBuilding,
  Mission,
  Timeline,
} from "@/components/portfolio/HeroSections";
import {
  HighlightProjects,
  ResearchInterests,
  SystemDesignSection,
} from "@/components/portfolio/ProjectsSection";
import { SkillsGraph } from "@/components/portfolio/SkillsGraph";
import {
  Experience,
  Education,
  Hackathons,
  IndustrySimulations,
  Certifications,
  Achievements,
} from "@/components/portfolio/ResumeSections";
import { GithubActivity } from "@/components/portfolio/GithubActivity";
import { AIPlayground, BlogPreview } from "@/components/portfolio/AIPlayground";
import { ContactTerminal } from "@/components/portfolio/ContactTerminal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vibhor Mishra — Building intelligent software systems" },
      {
        name: "description",
        content:
          "Vibhor Mishra is a Computer Science undergraduate building agentic AI, multi-agent systems, and production backends.",
      },
      { property: "og:title", content: "Vibhor Mishra — AI & Software Engineer" },
      {
        property: "og:description",
        content:
          "Building intelligent software systems with agentic AI and multi-agent architectures.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Vibhor Mishra",
          jobTitle: "AI Systems Engineer",
          url: "https://vibhormishra.dev",
          email: "vibhormishra0705@gmail.com",
          sameAs: [
            "https://github.com/vibhormishra1",
            "https://www.linkedin.com/in/vibhormishra1/",
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main>
        <Hero />
        <ImpactMetrics />
        <CurrentlyBuilding />
        <Mission />
        <Timeline />
        <HighlightProjects />
        <ResearchInterests />
        <SystemDesignSection />
        <SkillsGraph />
        <Experience />
        <Education />
        <Hackathons />
        <IndustrySimulations />
        <Certifications />
        <Achievements />
        <GithubActivity />
        <AIPlayground />
        <BlogPreview />
        <ContactTerminal />
      </main>
      <SiteFooter />
    </div>
  );
}
