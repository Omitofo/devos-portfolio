import type { Metadata } from "next";
import { getPage } from "@/lib/content";

const about = getPage("about");

export const metadata: Metadata = {
  title: about.frontmatter.title,
  description: about.frontmatter.description,
};

function paragraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="container-shell">
        <section className="about-page__intro section" aria-labelledby="about-title">
          <p className="eyebrow">About</p>
          <h1 id="about-title">{about.frontmatter.title}</h1>
        </section>

        <section className="about-page__content section" aria-label="About Renatus Cartesius">
          <div className="prose-readable">
            {paragraphs(about.body).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
