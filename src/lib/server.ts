import { sanityClient } from "./sanityClient";
import { SearchResult } from "./types";

interface GetRecommendationsParams {
  type: "anime" | "manga" | "manhwa" | "movie";
}

export async function getRecommendations({
  type,
}: GetRecommendationsParams): Promise<SearchResult[]> {
  try {
    const query = `*[_type == "recommendations" && type == $type]{
      id,
      title,
      type,
      image
    }`;

    const recommendations = await sanityClient.fetch<SearchResult[]>(query, {
      type,
    });

    return recommendations;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
}
