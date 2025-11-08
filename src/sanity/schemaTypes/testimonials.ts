export default {
  name: "testimonial",
  type: "document",
  title: "Testimonial",
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
  ],
  preview: {
    select: {
      name: "name",
      github: "github",
    },
    prepare(selection: any) {
      const { name, github } = selection;
      return {
        title: name || github || "Untitled Testimonial",
      };
    },
  },
};
