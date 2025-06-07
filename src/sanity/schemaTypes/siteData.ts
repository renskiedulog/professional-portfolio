export const siteData = {
  name: "siteData",
  title: "Site Data",
  type: "document",
  fields: [
    {
      name: "status",
      type: "string",
      title: "Current Status",
      options: {
        list: [
          { title: "Busy", value: "busy" },
          { title: "Open", value: "open" },
          { title: "Working on Project", value: "project" },
          { title: "Unavailable", value: "unavailable" },
        ],
        layout: "dropdown",
      },
    },
    {
      name: "qnaItems",
      type: "array",
      title: "Questions You Might Ask - Items",
      of: [
        {
          name: "item",
          type: "object",
          fields: [
            {
              name: "question",
              type: "string",
              title: "Question",
            },
            {
              name: "answer",
              type: "array",
              title: "Answer",
              of: [
                {
                  type: "block",
                  styles: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
