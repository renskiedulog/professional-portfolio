import { ThumbsUpIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const recommendations = defineType({
  name: "recommendations",
  title: "Recommendations",
  type: "document",
  icon: ThumbsUpIcon,
  fields: [
    defineField({
      name: "id",
      type: "string",
      title: "ID",
    }),
    defineField({
      name: "name",
      type: "string",
      title: "Name",
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Type",
    }),
  ],
});
