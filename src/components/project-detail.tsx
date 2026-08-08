import Link from "next/link";
import { MediaImage } from "@/components/MediaImage";
import type { Project } from "@/types/content";

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    return <span key={index}>{part}</span>;
  });
}

function MarkdownBody({ source }: { source: string }) {
  const blocks = source.split(/\n\s*\n/).filter(Boolean);
  return (
    <div className="project-detail__prose">
      {blocks.map((block, index) => {
        const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
        if (lines.every((line) => line.startsWith("- "))) {
          return <ul key={index}>{lines.map((line) => <li key={line}>{renderInline(line.slice(2))}</li>)}</ul>;
        }
        const heading = lines[0].match(/^(#{2,3})\s+(.+)$/);
        if (heading && lines.length === 1) {
          const Heading = heading[1].length === 2 ? "h2" : "h3";
          return <Heading key={index}>{renderInline(heading[2])}</Heading>;
        }
        return <p key={index}>{lines.map((line, lineIndex) => <span key={lineIndex}>{line}{lineIndex < lines.length - 1 ? <br /> : null}</span>)}</p>;
      })}
    </div>
  );
}

type ProjectDetailProps = {
  project: Project;
  previous?: { slug: string; title: string };
  next?: { slug: string; title: string };
};

export function ProjectDetail({ project, previous, next }: ProjectDetailProps) {
  const { frontmatter } = project;
  return (
    <article className="project-detail">
      <div className="container-shell">
        <div className="project-detail__back">
          <Link className="link-accent project-detail__back-link" href="/#selected-work">← Back to selected work</Link>
        </div>

        <header className="project-detail__header reading-width">
          <p className="eyebrow">Project</p>
          <h1>{frontmatter.title}</h1>
          <p className="project-detail__summary">{frontmatter.summary}</p>
          <dl className="project-detail__meta">
            <div><dt>Year</dt><dd>{frontmatter.date}</dd></div>
            <div><dt>Role</dt><dd>{frontmatter.role}</dd></div>
            <div><dt>Tags</dt><dd>{frontmatter.tags.join(" · ")}</dd></div>
          </dl>
        </header>

        {frontmatter.media[0] ? (
          <figure className="project-detail__media">
            <MediaImage src={frontmatter.media[0]} alt={`${frontmatter.title} placeholder project image`} fill priority sizes="(min-width: 1024px) 72rem, 100vw" />
          </figure>
        ) : null}

        <div className="project-detail__content">
          <MarkdownBody source={project.body} />
          <aside className="project-detail__outcomes" aria-labelledby="project-outcomes-title">
            <h2 id="project-outcomes-title">Outcomes</h2>
            <ul>{frontmatter.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
          </aside>
        </div>

        <nav className="project-detail__navigation" aria-label="Project navigation">
          {previous ? <Link href={`/work/${previous.slug}`} className="project-detail__nav-link"><span>Previous</span><strong>{previous.title}</strong></Link> : <span />}
          {next ? <Link href={`/work/${next.slug}`} className="project-detail__nav-link project-detail__nav-link--next"><span>Next</span><strong>{next.title}</strong></Link> : <span />}
        </nav>
      </div>
    </article>
  );
}
