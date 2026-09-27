import {
  blogToMarkdown,
  blogUrl,
  getAgentBlog,
  getAgentBlogs,
  markdownResponse,
} from "@/lib/agent-content";

// Served at /blog/<slug>.md via rewrite in next.config.ts
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const blogs = await getAgentBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const blog = await getAgentBlog(slug);

  if (!blog) return new Response("Not found", { status: 404 });

  return markdownResponse(blogToMarkdown(blog), blogUrl(slug));
}
