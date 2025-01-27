import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Blog")
    .items([
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      S.divider(),
      S.listItem()
        .title("Home - Left Section")
        .child(
          S.editor()
            .id("leftSectionContent")
            .schemaType("leftSectionContent")
            .documentId("leftSectionContent")
        ),
      S.listItem()
        .title("Home - Content")
        .child(
          S.editor()
            .id("homeContent")
            .schemaType("homeContent")
            .documentId("homeContent")
        ),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "post",
            "category",
            "author",
            "project",
            "leftSectionContent",
            "homeContent",
          ].includes(item.getId()!)
      ),
    ]);
