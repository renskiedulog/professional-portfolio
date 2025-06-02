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
  ],
};
