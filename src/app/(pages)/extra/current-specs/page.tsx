import React from "react";
import { pageMetadata } from "@/lib/site";

// Placeholder page, noindex until it has real content
export const metadata = pageMetadata({
  title: "Current Specs",
  description:
    "The hardware and setup Renato Dulog uses for development and gaming.",
  path: "/extra/current-specs",
  noindex: true,
});

const CurrentSpecsPage = async () => {
  return <div>CurrentSpecsPage</div>;
};

export default CurrentSpecsPage;
