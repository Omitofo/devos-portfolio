export interface ProjectFrontmatter {
  title: string;
  summary: string;
  date: string;
  role: string;
  tags: string[];
  media: string[];
  outcomes: string[];
}

export interface PageFrontmatter {
  title: string;
  description: string;
}

export interface ContentDocument<TFrontmatter> {
  frontmatter: TFrontmatter;
  body: string;
}

export function isProjectFrontmatter(
  value: unknown,
): value is ProjectFrontmatter {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.title === "string" &&
    typeof candidate.summary === "string" &&
    typeof candidate.date === "string" &&
    typeof candidate.role === "string" &&
    Array.isArray(candidate.tags) &&
    candidate.tags.every((tag) => typeof tag === "string") &&
    Array.isArray(candidate.media) &&
    candidate.media.every((path) => typeof path === "string") &&
    Array.isArray(candidate.outcomes) &&
    candidate.outcomes.every((outcome) => typeof outcome === "string")
  );
}
