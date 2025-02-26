import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { blogSchema } from "./blogSchema";
import { authorType } from "./authorType";
import { leftSectionContent } from "./leftSectionContent";
import { homeContent } from "./homeContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    blogSchema,
    authorType,
    leftSectionContent,
    homeContent,
  ],
};
