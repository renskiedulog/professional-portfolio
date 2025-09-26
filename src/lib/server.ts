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

const API_URL = process.env.NEXT_PUBLIC_JIKAN_API_URL!;

export const GetRecommendationInfo = async ({
  id,
  searchType,
}: {
  id: string;
  searchType: "anime" | "movie" | "manhwa" | "manga" | "tv";
}) => {
  let resultsType = searchType;
  let type = searchType;

  if (searchType === "anime") {
    resultsType = "tv";
  }

  if (searchType === "manhwa") {
    resultsType = searchType;
    type = "manga";
  }

  if (searchType === "movie") {
    resultsType = "movie";
    type = "anime";
  }
  try {
    const req = await fetch(`${API_URL}/${type}/${id}/full`);
    if (req.ok) {
      const data = await req.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
