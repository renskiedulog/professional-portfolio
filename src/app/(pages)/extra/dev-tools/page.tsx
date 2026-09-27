import React from "react";
import { pageMetadata } from "@/lib/site";

// Placeholder page, noindex until it has real content
export const metadata = pageMetadata({
  title: "Dev Tools",
  description:
    "Developer tools and utilities by Renato Dulog.",
  path: "/extra/dev-tools",
  noindex: true,
});

const DevToolsPage = () => {
  return <div>DevToolsPage</div>;
};

export default DevToolsPage;
