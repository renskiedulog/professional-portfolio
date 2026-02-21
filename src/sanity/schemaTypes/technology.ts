import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const technologyType = defineType({
  name: "technology",
  title: "Technology",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "icon",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "icon",
    },
  },
});
