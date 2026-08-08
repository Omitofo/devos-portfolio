import type { ProjectFrontmatter } from "@/types/content";

/**
 * Canonical project slugs. The Markdown files under content/projects are the
 * source of truth for their front matter and body copy.
 */
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

/**
 * Stable metadata used by future static routes before Markdown parsing is
 * introduced. Keep this registry aligned with the corresponding content file.
 */
export const projectIndex: ReadonlyArray<
  Pick<ProjectFrontmatter, "title" | "summary" | "date" | "role" | "tags"> & {
    slug: ProjectSlug;
  }
> = [
  {
    slug: "atlas-design-system",
    title: "Atlas Design System",
    summary:
      "A minimal component library and token set built for internal product teams.",
    date: "2025",
    role: "Product design and front-end implementation",
    tags: ["Design systems", "UI", "TypeScript"],
  },
  {
    slug: "northwind-notes",
    title: "Northwind Notes",
    summary:
      "A calm, keyboard-first note-taking experiment focused on speed and clarity.",
    date: "2025",
    role: "Product design and prototype development",
    tags: ["Product design", "Interaction", "Accessibility"],
  },
  {
    slug: "signal-dashboard",
    title: "Signal Dashboard",
    summary:
      "Lightweight operational overview for small teams — clarity over decoration.",
    date: "2024",
    role: "UX, UI, and front-end implementation",
    tags: ["Dashboard", "UX", "Front-end"],
  },
  {
    slug: "harbor-brand-identity",
    title: "Harbor Brand Identity",
    summary:
      "Visual identity and website for a fictional independent studio.",
    date: "2024",
    role: "Brand direction and web design",
    tags: ["Brand identity", "Art direction", "Web design"],
  },
  {
    slug: "cascade-cli",
    title: "Cascade CLI",
    summary:
      "Open-source command-line tool that turns structured content into static sites.",
    date: "2024",
    role: "Product concept and engineering",
    tags: ["Open source", "CLI", "Developer tools"],
  },
  {
    slug: "quiet-portfolio",
    title: "Quiet Portfolio (meta)",
    summary:
      "The design and build process of this very site — documented as a case study.",
    date: "2026",
    role: "Design, engineering, and documentation",
    tags: ["Portfolio", "Next.js", "Design systems"],
  },
];
