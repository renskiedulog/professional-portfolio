"use server";
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
      throw new Error(`Failed to fetch repo data. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.stargazers_count;
  } catch (error) {
    console.error("Error fetching repository stars:", error);
    throw error;
  }
}
