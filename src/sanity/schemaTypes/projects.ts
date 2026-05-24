import { IoConstructOutline } from "react-icons/io5";
import { defineArrayMember, defineType } from "sanity";

export const projects = defineType({
  name: "projects",
  title: "Projects",
  type: "document",
  icon: IoConstructOutline,
  fields: [
    {
      type: "string",
      name: "title",
      title: "Project Title",
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      type: "text",
      name: "description",
      title: "Project Description",
    },
    {
      type: "string",
      name: "category",
      title: "Category",
      options: {
        list: [
          { title: "Example Site", value: "example site" },
          { title: "Application", value: "application" },
          { title: "Website", value: "website" },
          { title: "Game", value: "game" },
          { title: "Tool", value: "tool" },
          { title: "Template", value: "template" },
          { title: "Playground", value: "playground" },
          { title: "Integration", value: "integration" },
          { title: "Web App", value: "web app" },
        ],
        layout: "dropdown",
      },
    },
    {
      type: "url",
      name: "githubLink",
      title: "Github Link",
    },
    {
      type: "array",
      name: "techStack",
      title: "Tech Stack",
      of: [
        {
          type: "reference",
          to: [{ type: "technology" }],
        },
      ],
    },
    {
      type: "url",
      name: "liveUrl",
      title: "Live URL",
    },
    {
      type: "array",
      name: "images",
      title: "Project Images",
      description: "First image is set as the cover image.",
      layout: "grid",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
        }),
      ],
    },
    {
      type: "boolean",
      name: "featured",
      title: "Featured",
      description: "Show this project on the homepage.",
    },
    {
      name: "body",
      type: "customBlockContent",
    },
  ],
});
