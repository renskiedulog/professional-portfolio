import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { blogSchema } from "./blogSchema";
import { authorType } from "./authorType";
import { customBlockContent } from "./types/customBlockContent";
import { formSubmissions } from "./formSubmission";
import { siteData } from "./siteData";
import { projects } from "./projects";
import { recommendations } from "./recommendations";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    blogSchema,
    authorType,
    customBlockContent,
    formSubmissions,
    siteData,
    projects,
    recommendations,
  ],
};
