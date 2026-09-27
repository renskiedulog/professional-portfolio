// Content for AI agents: llms.txt, llms-full.txt, per-page markdown and the agent sitemap.
// Every route using this is force-static, so it is regenerated on each deploy
// (the Sanity webhook triggers a rebuild on every Studio change).
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanityClient";
import { urlFor } from "@/sanity/lib/image";
import { SAME_AS, SHORT_BIO, SITE_NAME, SITE_URL } from "@/lib/site";

export type AgentBlog = {
  title: string;
  slug: string;
  description?: string;
  publishedAt: string;
  _updatedAt: string;
  categories?: string[];
  body?: any[];
};

export type AgentProject = {
  title: string;
  slug: string;
  description?: string;
  category?: string;
  githubLink?: string;
  liveUrl?: string;
  techStack?: string[];
  _updatedAt: string;
  body?: any[];
};

const blogFields = groq`
  title,
  "slug": slug.current,
  description,
  publishedAt,
  _updatedAt,
  "categories": categories[]->title,
  body
`;

const projectFields = groq`
  title,
  "slug": slug.current,
  description,
  category,
  githubLink,
  liveUrl,
  "techStack": techStack[]->name,
  _updatedAt,
  body
`;

const publicBlogFilter = groq`_type == "blog" && !(_id in path("drafts.**")) && defined(slug.current) && defined(publishedAt) && publishedAt <= now()`;
const publicProjectFilter = groq`_type == "projects" && !(_id in path("drafts.**")) && defined(slug.current)`;

export const getAgentBlogs = (): Promise<AgentBlog[]> =>
  sanityClient.fetch(
    groq`*[${publicBlogFilter}] | order(publishedAt desc) { ${blogFields} }`
  );

export const getAgentBlog = (slug: string): Promise<AgentBlog | null> =>
  sanityClient.fetch(
    groq`*[${publicBlogFilter} && slug.current == $slug][0] { ${blogFields} }`,
    { slug }
  );

export const getAgentProjects = (): Promise<AgentProject[]> =>
  sanityClient.fetch(
    groq`*[${publicProjectFilter}] | order(_createdAt desc) { ${projectFields} }`
  );

export const getAgentProject = (slug: string): Promise<AgentProject | null> =>
  sanityClient.fetch(
    groq`*[${publicProjectFilter} && slug.current == $slug][0] { ${projectFields} }`,
    { slug }
  );

export const blogUrl = (slug: string) => `${SITE_URL}/blog/${slug}`;
export const projectUrl = (slug: string) => `${SITE_URL}/works/${slug}`;

const day = (iso?: string) => (iso ? iso.slice(0, 10) : "");

// ---------- Portable Text -> Markdown ----------

// Wrap text in a markdown mark while keeping surrounding whitespace outside of it
const wrap = (text: string, open: string, close = open) => {
  const match = text.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!match || !match[2]) return text;
  return `${match[1]}${open}${match[2]}${close}${match[3]}`;
};

const renderSpans = (block: any): string => {
  const markDefs: any[] = block.markDefs ?? [];

  return (block.children ?? [])
    .map((child: any) => {
      if (child._type !== "span") return "";
      let text: string = child.text ?? "";

      for (const mark of child.marks ?? []) {
        if (mark === "strong") text = wrap(text, "**");
        else if (mark === "em") text = wrap(text, "_");
        else if (mark === "code") text = wrap(text, "`");
        else if (mark === "strike-through") text = wrap(text, "~~");
        else {
          const def = markDefs.find((d) => d._key === mark);
          if (def?._type === "link" && def.href) {
            text = wrap(text, "[", `](${def.href})`);
          }
        }
      }

      return text;
    })
    .join("");
};

const renderBlock = (block: any): string => {
  switch (block._type) {
    case "block": {
      // Soft line breaks (\n inside spans) would break single-line markdown syntax
      const text =
        block.listItem || (block.style && block.style !== "normal")
          ? renderSpans(block).replace(/\s*\n\s*/g, " ").trim()
          : renderSpans(block).trim();
      if (block.listItem) {
        const indent = "  ".repeat(Math.max((block.level ?? 1) - 1, 0));
        const bullet = block.listItem === "number" ? "1." : "-";
        return `${indent}${bullet} ${text}`;
      }
      const heading = block.style?.match(/^h([1-6])$/);
      if (heading) return `${"#".repeat(Math.min(Number(heading[1]) + 1, 6))} ${text}`;
      if (block.style === "blockquote") return `> ${text}`;
      return text;
    }
    case "image":
      return block.asset
        ? `![${block.alt ?? ""}](${urlFor(block).width(1200).url()})`
        : "";
    case "youtube":
      return block.url ? `[YouTube video](${block.url})` : "";
    case "button":
      return block.href ? `[${block.text ?? block.href}](${block.href})` : "";
    case "border":
      return "---";
    default:
      return "";
  }
};

export const portableTextToMarkdown = (blocks: any[] = []): string => {
  let out = "";
  let prevWasList = false;

  for (const block of blocks) {
    const md = renderBlock(block);
    if (!md.trim()) continue;
    const isList = block._type === "block" && !!block.listItem;
    // List items stay on consecutive lines, everything else gets a blank line
    out += out ? (isList && prevWasList ? "\n" : "\n\n") : "";
    out += md;
    prevWasList = isList;
  }

  return out.trim();
};

// ---------- Documents ----------

export const blogToMarkdown = (blog: AgentBlog): string => {
  const meta = [
    `- URL: ${blogUrl(blog.slug)}`,
    `- Author: ${SITE_NAME}`,
    `- Published: ${day(blog.publishedAt)}`,
    `- Updated: ${day(blog._updatedAt)}`,
    blog.categories?.length
      ? `- Categories: ${blog.categories.join(", ")}`
      : "",
  ].filter(Boolean);

  return [
    `# ${blog.title}`,
    blog.description ? `> ${blog.description}` : "",
    meta.join("\n"),
    portableTextToMarkdown(blog.body),
  ]
    .filter(Boolean)
    .join("\n\n");
};

export const projectToMarkdown = (project: AgentProject): string => {
  const meta = [
    `- URL: ${projectUrl(project.slug)}`,
    `- Author: ${SITE_NAME}`,
    project.category ? `- Category: ${project.category}` : "",
    project.techStack?.length
      ? `- Tech stack: ${project.techStack.filter(Boolean).join(", ")}`
      : "",
    project.liveUrl ? `- Live: ${project.liveUrl}` : "",
    project.githubLink ? `- Source: ${project.githubLink}` : "",
    `- Updated: ${day(project._updatedAt)}`,
  ].filter(Boolean);

  return [
    `# ${project.title}`,
    project.description ? `> ${project.description}` : "",
    meta.join("\n"),
    portableTextToMarkdown(project.body),
  ]
    .filter(Boolean)
    .join("\n\n");
};

const aboutSection = () =>
  [
    `# ${SITE_NAME}`,
    `> ${SHORT_BIO}`,
    [
      "- Role: Full-Stack Web Developer",
      "- Location: Cebu, Philippines",
      "- Employer: WebriQ",
      "- Education: Certificate in Computer Technology, University of San Carlos (Passerelles Numériques Philippines scholar)",
      "- Stack: React, Next.js, TypeScript, Node.js, Tailwind CSS, Sanity",
      "- Available for: freelance web development projects",
      `- Website: ${SITE_URL}`,
      ...SAME_AS.map((url) => `- Profile: ${url}`),
    ].join("\n"),
  ].join("\n\n");

export const buildLlmsTxt = (
  blogs: AgentBlog[],
  projects: AgentProject[]
): string => {
  const line = (title: string, url: string, desc?: string) =>
    `- [${title}](${url})${desc ? `: ${desc.replace(/\s+/g, " ").trim()}` : ""}`;

  return [
    aboutSection(),
    "## Pages",
    [
      line("Home", SITE_URL, "Bio, skills, work experience, education, featured projects and testimonials"),
      line("Works", `${SITE_URL}/works`, "All projects"),
      line("Blog", `${SITE_URL}/blog`, "All blog posts"),
      line("Services", `${SITE_URL}/services`, "Freelance services, pricing and workflow"),
      line("Questions You Might Ask", `${SITE_URL}/extra/questions-you-might-ask`, "FAQ about Renato Dulog"),
    ].join("\n"),
    "## Blog posts",
    blogs
      .map((b) => line(b.title, `${blogUrl(b.slug)}.md`, `${b.description ?? ""} (${day(b.publishedAt)})`))
      .join("\n"),
    "## Projects",
    projects
      .map((p) => line(p.title, `${projectUrl(p.slug)}.md`, p.description))
      .join("\n"),
    "## Optional",
    line("Full content", `${SITE_URL}/llms-full.txt`, "Every blog post and project in one markdown file"),
  ].join("\n\n") + "\n";
};

export const buildLlmsFullTxt = (
  blogs: AgentBlog[],
  projects: AgentProject[]
): string =>
  [
    aboutSection(),
    "# Blog posts",
    ...blogs.map(blogToMarkdown),
    "# Projects",
    ...projects.map(projectToMarkdown),
  ].join("\n\n---\n\n") + "\n";

const latest = (dates: string[]) =>
  dates.filter(Boolean).sort().at(-1) ?? new Date().toISOString();

const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const buildAgentSitemap = (
  blogs: AgentBlog[],
  projects: AgentProject[]
): string => {
  const newest = latest([
    ...blogs.map((b) => b._updatedAt),
    ...projects.map((p) => p._updatedAt),
  ]);

  const entries = [
    { loc: `${SITE_URL}/llms.txt`, lastmod: newest },
    { loc: `${SITE_URL}/llms-full.txt`, lastmod: newest },
    ...blogs.map((b) => ({ loc: `${blogUrl(b.slug)}.md`, lastmod: b._updatedAt })),
    ...projects.map((p) => ({ loc: `${projectUrl(p.slug)}.md`, lastmod: p._updatedAt })),
  ];

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...entries.map(
      (e) =>
        `<url><loc>${xmlEscape(e.loc)}</loc><lastmod>${e.lastmod}</lastmod></url>`
    ),
    `</urlset>`,
    "",
  ].join("\n");
};

export const markdownResponse = (body: string, canonical?: string) =>
  new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      ...(canonical ? { Link: `<${canonical}>; rel="canonical"` } : {}),
    },
  });
