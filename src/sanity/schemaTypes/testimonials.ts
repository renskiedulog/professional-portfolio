import { MdOutlineMessage } from "react-icons/md";

export const testimonials = {
  name: "testimonial",
  type: "document",
  title: "Testimonial",
  icon: MdOutlineMessage,
  fields: [
    {
      name: "github",
      type: "url",
      title: "GitHub",
      description: "Used for fetching user details, and github link.",
    },
    {
      name: "name",
      type: "string",
      title: "Full Name",
    },
    {
      name: "position",
      type: "string",
      title: "Position / Title",
    },
    {
      name: "photo",
      type: "image",
      title: "Photo",
    },
    {
      name: "linkedin",
      type: "url",
      title: "LinkedIn Profile",
    },
    {
      name: "portfolio",
      type: "url",
      title: "Portfolio / Website",
    },
    {
      name: "testimonial",
      type: "text",
      title: "Testimonial Text",
    },
    {
      name: "shown",
      type: "boolean",
      title: "Shown on Website",
      description: "Toggle to make the testimonial visible.",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      name: "name",
      github: "github",
      photo: "photo",
      shown: "shown",
    },
    prepare(selection: any) {
      const { name, github, photo, shown } = selection;
      return {
        title: name || github || "Untitled Testimonial",
        media: photo,
        subtitle: shown ? "Visible" : "Hidden",
      };
    },
  },
};
