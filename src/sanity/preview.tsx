// ./plugins/LiveURLBadge.ts
import type { DocumentBadgeDescription, DocumentBadgeProps } from "sanity";

export function LiveURLBadge(
  props: DocumentBadgeProps
): DocumentBadgeDescription | null {
  const doc = props?.published;
  const isPublished = !props?.draft;

  if (doc?._type === "recommendations" && doc?.id) {
    const slug = doc.id;
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`;

    return {
      label: (
        <a
          href={url}
          target="_blank"
          className="p-2"
          style={{
            marginRight: 5,
            padding: 8,
            fontSize: "1.5em",
            textTransform: "lowercase",
            color: isPublished ? "#31975e" : "#958228",
            cursor: isPublished ? "pointer" : "default",
          }}
        >
          {url}
        </a>
      ),
      color: "success",
      title: "Open live page",
    };
  }

  return null;
}
