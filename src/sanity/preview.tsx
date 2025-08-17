// ./plugins/LiveURLBadge.ts
import type { DocumentBadgeDescription, DocumentBadgeProps } from "sanity";

export function LiveURLBadge(
  props: DocumentBadgeProps
): DocumentBadgeDescription | null {
  const doc = props?.published || props?.draft;
  const isPublished = !props?.draft;

  if (doc?._type === "blog" && doc?.slug?.current) {
    const slug = doc?.slug?.current;
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
            fontSize: "1.2em",
            textTransform: "lowercase",
            color: isPublished ? "#31975e" : "#958228",
            cursor: "pointer",
          }}
        >
          {url}
        </a>
      ),
      title: "Open Blog Page",
    };
  }

  return null;
}
