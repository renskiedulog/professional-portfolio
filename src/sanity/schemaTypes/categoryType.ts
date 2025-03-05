import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom(async (title, context) => {
          const { document, getClient } = context;
          if (!title) return "Title is required";

          const client = getClient({ apiVersion: "2023-03-01" });
          const existingCategories = await client.fetch(
            `count(*[_type == "category" && title == $title && _id != $id])`,
            { title, id: document?._id }
          );

          return existingCategories > 0
            ? "Category title must be unique"
            : true;
        }),
    }),
  ],
});
