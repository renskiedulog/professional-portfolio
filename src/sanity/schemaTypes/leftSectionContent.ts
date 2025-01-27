export const leftSectionContent = {
  name: "leftSectionContent",
  title: "Home - Left Section",
  type: "document",
  fields: [
    {
      type: "image",
      name: "mainImage",
      title: "Main Image",
    },
    {
      type: "string",
      name: "fullName",
      title: "Full Name",
    },
    {
      type: "string",
      name: "profession",
      title: "Profession",
    },
    {
      type: "array",
      name: "badges",
      title: "Badges",
      of: [
        {
          type: "object",
          fields: [
            { type: "string", name: "label", title: "Label" },
            { type: "image", name: "icon", title: "Icon" },
          ],
        },
      ],
      description:
        "Personal information badges and interests (e.g. Male, 21 Years Old, Programming, Anime, etc.)",
      preview: {
        select: {
          label: "label",
          icon: "icon",
        },
      },
    },
    {
      type: "object",
      name: "contact",
      title: "Contact Information",
      fields: [
        {
          type: "string",
          name: "location",
          title: "Location",
        },
        {
          type: "string",
          name: "email",
          title: "Email",
        },
        {
          type: "string",
          name: "phone",
          title: "Phone Number",
        },
        {
          type: "string",
          name: "facebook",
          title: "Facebook Username",
        },
        {
          type: "string",
          name: "linkedin",
          title: "LinkedIn Username",
        },
      ],
    },
    {
      type: "array",
      name: "characteristics",
      title: "Characteristics",
      of: [
        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "title",
              title: "Title",
            },
            {
              type: "text",
              name: "description",
              title: "Description",
            },
          ],
        },
      ],
    },
    {
      type: "array",
      name: "stats",
      title: "Statistics",
      of: [
        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "title",
              title: "Title",
            },
            {
              type: "string",
              name: "value",
              title: "Value",
            },
            {
              type: "string",
              name: "subtitle",
              title: "Subtitle",
            },
          ],
        },
      ],
    },
  ],
};
