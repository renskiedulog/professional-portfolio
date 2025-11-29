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
      type: "url",
      name: "githubLink",
      title: "Github Link",
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
      name: "myDocument",
      title: "My Document",
      type: "document",
      fields: [
        {
          name: "languages",
          title: "Languages",
          type: "array",
          of: [
            {
              type: "string",
            },
          ],
          options: {
            list: [
              { title: "English", value: "en" },
              { title: "German", value: "de" },
              { title: "French", value: "fr" },
              { title: "Spanish", value: "es" },
              { title: "Italian", value: "it" },
            ],
            layout: "grid",
          },
        },
      ],
    },
    {
      name: "body",
      type: "customBlockContent",
    },
  ],
});
