import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blogSchema = defineType({
  name: "blog",
  title: "blog",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "body",
      type: "customBlockContent",
    }),
    // Additional fields
    defineField({
      name: "viewCount",
      type: "number",
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: "likeCount",
      type: "number",
      title: "Like Count",
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: "commentsEnabled",
      type: "boolean",
      title: "Enable Comments",
      description: "Toggle to enable or disable comments on the post",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      viewCount: "viewCount",
      likeCount: "likeCount",
    },
    prepare(selection) {
      const { author, viewCount, likeCount } = selection;
      return {
        ...selection,
        subtitle: author
          ? `by ${author} | Views: ${viewCount} | Likes: ${likeCount}`
          : `Views: ${viewCount} | Likes: ${likeCount}`,
      };
    },
  },
});
