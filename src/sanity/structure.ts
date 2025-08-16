import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Blog")
    .items([
      S.documentTypeListItem("blog").title("Blogs"),
      S.documentTypeListItem("category").title("Categories"),
      // S.documentTypeListItem("author").title("Authors"),
      S.divider(),
      S.documentTypeListItem("formSubmissions").title("Form Submissions"),
      S.divider(),
      S.listItem()
        .title("Site Data")
        .child(
          S.editor()
            .id("siteData")
            .schemaType("siteData")
            .documentId("siteData")
            .title("Site Data")
        ),
      S.documentTypeListItem("projects").title("Projects"),
      S.documentTypeListItem("recommendations").title("Recommendations"),
    ]);
