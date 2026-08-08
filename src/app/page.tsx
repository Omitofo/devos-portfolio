import { IntroBlock } from "@/components/intro-block";
import { ProjectCard } from "@/components/project-card";
import { projectIndex } from "@/lib/content";

export default function Home() {
  return (
    <div className="home-page">
      <div className="container-shell">
        <IntroBlock />

        <section className="home-work section" aria-labelledby="selected-work-title">
          <div className="home-work__heading">
            <p className="eyebrow">Selected work</p>
            <h2 id="selected-work-title">A few things I&apos;ve made.</h2>
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
