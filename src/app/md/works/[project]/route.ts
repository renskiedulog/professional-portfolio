import {
  getAgentProject,
  getAgentProjects,
  markdownResponse,
  projectToMarkdown,
  projectUrl,
} from "@/lib/agent-content";

// Served at /works/<project>.md via rewrite in next.config.ts
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getAgentProjects();
  return projects.map((project) => ({ project: project.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ project: string }> }
) {
  const { project } = await params;
  const info = await getAgentProject(project);

  if (!info) return new Response("Not found", { status: 404 });

  return markdownResponse(projectToMarkdown(info), projectUrl(project));
}
