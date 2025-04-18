export const formSubmissions = {
  name: "formSubmissions",
  title: "Form Submissions",
  type: "document",
  fields: [
    {
      name: "email",
      type: "string",
    },
    {
      name: "gameplan",
      type: "string",
    },
    {
      name: "message",
      type: "text",
    },
    {
      name: "submittedAt",
      type: "datetime",
    },
    {
      name: "ip",
      type: "string",
      title: "IP Address",
      description: "User's IP address for submission tracking",
    },
    {
      name: "lastSubmittedDate",
      type: "string",
      title: "Last Submitted Date",
      description: "Date of last submission to track submission limit",
    },
  ],
};
