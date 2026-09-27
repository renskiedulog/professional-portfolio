import { buildLlmsTxt, getAgentBlogs, getAgentProjects } from "@/lib/agent-content";

// Built at deploy time; the Sanity webhook redeploy regenerates it
export const dynamic = "force-static";

export async function GET() {
  const [blogs, projects] = await Promise.all([getAgentBlogs(), getAgentProjects()]);

  return new Response(buildLlmsTxt(blogs, projects), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
