import { defineType, defineField, defineArrayMember } from "sanity";
import { ImageIcon, VideoIcon } from "lucide-react";
import { FaBorderStyle } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";

export const customBlockContent = defineType({
  name: "customBlockContent",
  title: "Custom Block Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
    }),
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "youtube",
      icon: VideoIcon,
      title: "YouTube",
      fields: [
        defineField({
          name: "url",
          type: "url",
          title: "YouTube Video URL",
        }),
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "border",
      icon: FaBorderStyle,
      title: "Border",
      fields: [
        defineField({
          name: "width",
          title: "Width In Percentage",
          type: "number",
        }),
      ],
      preview: {
        select: {
          title: "Border",
        },
      },
    }),
    defineArrayMember({
      type: "object",
      name: "button",
      icon: HiCursorClick,
      title: "Button",
      fields: [
        defineField({
          name: "text",
          type: "string",
          title: "Button Label",
        }),
        defineField({
          name: "href",
          type: "url",
          title: "Button URL",
        }),
      ],
    }),
  ],
});
