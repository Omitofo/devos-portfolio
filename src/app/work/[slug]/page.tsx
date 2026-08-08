import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { getProject, isProjectSlug, projectIndex, projectSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isProjectSlug(slug)) return {};
  const project = getProject(slug);
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      title: project.frontmatter.title,
      description: project.frontmatter.summary,
      url: absoluteUrl(`/work/${slug}`),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  if (!isProjectSlug(slug)) notFound();

  const project = getProject(slug);
  const index = projectIndex.findIndex((item) => item.slug === slug);
  const previous = index > 0 ? projectIndex[index - 1] : undefined;
  const next = index >= 0 && index < projectIndex.length - 1 ? projectIndex[index + 1] : undefined;

  return (
    <ProjectDetail
      project={project}
      previous={previous ? { slug: previous.slug, title: previous.title } : undefined}
      next={next ? { slug: next.slug, title: next.title } : undefined}
    />
  );
}
