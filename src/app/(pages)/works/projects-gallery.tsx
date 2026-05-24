import { sanityClient } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import ProjectsList from "./projects-list";

export type ProjectPreview = {
  title: string;
  description: string;
  slug: string;
  coverImage: string | null;
  category: string | null;
};

async function getProjects(): Promise<ProjectPreview[]> {
  return sanityClient.fetch(
    groq`*[_type == "projects" && !(_id in path("drafts.**"))] | order(_createdAt asc) {
      title,
      description,
      "slug": slug.current,
      "coverImage": images[0].asset->url,
      category
    }`
  );
}

export default async function ProjectsGallery() {
  const projects = await getProjects();
  return <ProjectsList projects={projects} />;
}
