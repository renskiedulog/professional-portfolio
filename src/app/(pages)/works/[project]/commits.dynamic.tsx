import { getAllCommits } from "@/lib/github";
import React from "react";
import { Roadmap } from "./roadmap";
import { classifyCommit } from "@/lib/utils";

export const dynamic = "force-dynamic";

const DynamicCommits = async ({ githubLink }: { githubLink: string }) => {
  const commits = await getAllCommits(githubLink);
  const roadmap = groupCommitsByMonth(commits);

  return <Roadmap sections={roadmap} />;
};

export default DynamicCommits;

export function groupCommitsByMonth(commits: any[]) {
  const grouped: Record<string, any[]> = {};

  for (const c of commits) {
    const msg = c.commit.message;
    const date = new Date(c.commit.author.date);
    const month = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (!grouped[month]) grouped[month] = [];

    grouped[month].push({
      sha: c.sha,
      message: msg,
      type: classifyCommit(msg),
      date,
    });
  }

  return grouped;
}
