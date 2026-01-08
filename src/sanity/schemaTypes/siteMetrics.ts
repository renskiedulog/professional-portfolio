import { FaDatabase } from "react-icons/fa";

export const siteMetrics = {
  name: "siteMetrics",
  title: "Site Metrics",
  type: "document",
  icon: FaDatabase,
  fields: [
    {
      name: "siteVisits",
      type: "number",
      readOnly: true,
      initialValue: 0,
    },
  ],
};
