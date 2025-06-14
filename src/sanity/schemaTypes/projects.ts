import { IoConstructOutline } from "react-icons/io5";
import { defineArrayMember, defineField, defineType } from "sanity";

export const projects = defineType({
  name: "projects",
  title: "Projects",
  type: "document",
  icon: IoConstructOutline,
  fields: [
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
      type: "string",
      name: "title",
      title: "Project Title",
    },
    {
      type: "text",
      name: "description",
      title: "Project Title",
    },
    {
      type: "url",
      name: "githubLink",
      title: "Github Link",
    },
    {
      type: "url",
      name: "caseStudyLink",
      title: "Case Study Link",
    },
  ],
});
