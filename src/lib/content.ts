import fs from "node:fs";
import path from "node:path";
import type { ProjectFrontmatter, Project } from "@/types/content";

export const projectSlugs = [
  "atlas-design-system",
  "northwind-notes",
  "signal-dashboard",
  "harbor-brand-identity",
  "cascade-cli",
  "quiet-portfolio",
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

export function isProjectSlug(value: string): value is ProjectSlug {
  return (projectSlugs as readonly string[]).includes(value);
}

export const projectIndex: ReadonlyArray<
  Pick<ProjectFrontmatter, "title" | "summary" | "date" | "role" | "tags"> & {
    slug: ProjectSlug;
  }
> = [
  { slug: "atlas-design-system", title: "Atlas Design System", summary: "A minimal component library and token set built for internal product teams.", date: "2025", role: "Product design and front-end implementation", tags: ["Design systems", "UI", "TypeScript"] },
  { slug: "northwind-notes", title: "Northwind Notes", summary: "A calm, keyboard-first note-taking experiment focused on speed and clarity.", date: "2025", role: "Product design and prototype development", tags: ["Product design", "Interaction", "Accessibility"] },
  { slug: "signal-dashboard", title: "Signal Dashboard", summary: "Lightweight operational overview for small teams — clarity over decoration.", date: "2024", role: "UX, UI, and front-end implementation", tags: ["Dashboard", "UX", "Front-end"] },
  { slug: "harbor-brand-identity", title: "Harbor Brand Identity", summary: "Visual identity and website for a fictional independent studio.", date: "2024", role: "Brand direction and web design", tags: ["Brand identity", "Art direction", "Web design"] },
  { slug: "cascade-cli", title: "Cascade CLI", summary: "Open-source command-line tool that turns structured content into static sites.", date: "2024", role: "Product concept and engineering", tags: ["Open source", "CLI", "Developer tools"] },
  { slug: "quiet-portfolio", title: "Quiet Portfolio (meta)", summary: "The design and build process of this very site — documented as a case study.", date: "2026", role: "Design, engineering, and documentation", tags: ["Portfolio", "Next.js", "Design systems"] },
];

const contentRoot = path.join(process.cwd(), "content", "projects");

function parseScalar(value: string): string {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(source: string): { frontmatter: ProjectFrontmatter; body: string } {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("Project content is missing front matter.");

  const lines = match[1].split("\n");
  const data: Record<string, string | string[]> = {};
  let activeArray: string | null = null;

  for (const line of lines) {
    const item = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (item) {
      const [, key, raw] = item;
      if (raw === "") {
        data[key] = [];
        activeArray = key;
      } else {
        data[key] = parseScalar(raw);
        activeArray = null;
      }
      continue;
    }

    const arrayItem = line.match(/^\s*-\s+(.*)$/);
    if (arrayItem && activeArray) {
      const current = data[activeArray];
      if (Array.isArray(current)) current.push(parseScalar(arrayItem[1]));
    }
  }

  const frontmatter = data as unknown as ProjectFrontmatter;
  if (!frontmatter.title || !frontmatter.summary || !frontmatter.date || !frontmatter.role || !Array.isArray(frontmatter.tags) || !Array.isArray(frontmatter.media) || !Array.isArray(frontmatter.outcomes)) {
    throw new Error("Project front matter is incomplete.");
  }

  return { frontmatter, body: match[2].trim() };
}

export function getProject(slug: ProjectSlug): Project {
  const source = fs.readFileSync(path.join(contentRoot, `${slug}.md`), "utf8");
  return { slug, ...parseFrontmatter(source) };
}

export function getAllProjects(): Project[] {
  return projectSlugs.map(getProject);
}
