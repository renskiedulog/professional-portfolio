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
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Type",
    }),
    defineField({
      name: "image",
      type: "string",
      title: "Image",
    }),
    defineField({
      name: "favorite",
      type: "boolean",
      title: "Personal Favorite",
      initialValue: false,
    }),
    defineField({
      name: "fromTmdb",
      type: "boolean",
      title: "From TMDB",
      initialValue: false,
    }),
  ],
});
