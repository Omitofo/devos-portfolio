import Link from "next/link";
import type { ProjectSlug } from "@/lib/content";

type ProjectCardProps = {
  slug: ProjectSlug;
  title: string;
  summary: string;
  date: string;
  role: string;
  tags: string[];
};

export function ProjectCard({
  slug,
  title,
  summary,
  date,
  role,
  tags,
}: ProjectCardProps) {
  return (
    <article className="project-card">
      <Link
        className="project-card__link"
        href={`/work/${slug}`}
        aria-label={`View ${title} project`}
      >
        <div className="project-card__body">
          <div className="project-card__meta">
            <span>{date}</span>
            <span aria-hidden="true">·</span>
            <span>{role}</span>
          </div>

          <h2 className="project-card__title">{title}</h2>
          <p className="project-card__summary">{summary}</p>

          <ul className="project-card__tags" aria-label="Project tags">
            {tags.slice(0, 3).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          <span className="project-card__action" aria-hidden="true">
            View project <span>→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
