import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { projectIndex } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected projects by Renatus Cartesius.",
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    title: "Selected Work",
    description: "Selected projects by Renatus Cartesius.",
    url: absoluteUrl("/work"),
  },
};

export default function WorkPage() {
  return (
    <div className="work-page">
      <div className="container-shell">
        <section className="home-work section" aria-labelledby="selected-work-title">
          <div className="home-work__heading">
            <p className="eyebrow">Selected work</p>
            <h1 id="selected-work-title">A few things I&apos;ve made.</h1>
          </div>

          <div className="project-grid" aria-label="Selected projects">
            {projectIndex.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
