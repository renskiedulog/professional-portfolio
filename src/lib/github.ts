"use server";

import { urlFor } from "@/sanity/lib/image";
import { sanityClient } from "./sanityClient";
import { unstable_cache } from "next/cache";

export async function getRepoStarsFromLink(repoUrl: string) {
  if (!repoUrl) {
    return null;
  }

  const match = repoUrl.match(
    /^https?:\/\/github\.com\/([^/]+)\/([^/]+)(\/|$)/
  );
  if (!match) {
    throw new Error("Invalid GitHub repository URL.");
  }

  const [_, owner, repo] = match;

  const url = `https://api.github.com/repos/${owner}/${repo}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.stargazers_count;
  } catch (error) {
    return null;
  }
}

export async function getGitHubProfile(username: string) {
  if (!username) return null;

  const url = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();

    return {
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      blog: data.blog,
    };
  } catch (error) {
    return null;
  }
}

export const getEnrichedTestimonials = unstable_cache(
  async () => {
    const testimonials =
      await sanityClient.fetch(`*[_type == "testimonial" && shown == true]{
        name,
        position,
        photo,
        github,
        linkedin,
        portfolio,
        testimonial,
      }`);

    const enriched = await Promise.all(
      testimonials.map(async (t: any) => {
        const username = t.github?.split("/").filter(Boolean).pop();
        const githubProfile = username
          ? await getGitHubProfile(username)
          : null;

        return {
          ...t,
          displayName: t.name || githubProfile?.name || "",
          displayPhoto: t.photo
            ? urlFor(t.photo)
                .width(80)
                .height(80)
                .fit("crop")
                .quality(60)
                .auto("format")
                .url()
            : githubProfile?.avatar_url
              ? `${githubProfile.avatar_url}&s=80`
              : null,
          displayBio: t.position,
          portfolio: githubProfile?.blog || t.portfolio || "",
        };
      })
    );

    return enriched;
  },
  ["testimonials"],
  { revalidate: 86400 }
);

export async function getAllCommits(repoUrl: string) {
  const match = repoUrl.match(
    /^https?:\/\/github\.com\/([^/]+)\/([^/]+)(\/|$)/
  );

  if (!match) return [];

  const [_, owner, repo] = match;

  let allCommits: any[] = [];
  let page = 1;

  while (true) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=100&page=${page}`;

    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
    });

    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;

    allCommits = [...allCommits, ...batch];
    page++;
  }

  return allCommits;
}
