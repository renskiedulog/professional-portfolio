"use server";
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
  let type = searchType;

  if (searchType === "manhwa") {
    type = "manga";
  }

  if (searchType === "movie") {
    type = "anime";
  }

  try {
    const query = `*[_type == "recommendations"]{
      id,
    }`;

    const recommendations = await sanityClient.fetch<SearchResult[]>(query, {
      type,
    });

    if (!recommendations?.map((rec) => rec.id).includes(Number(id)) === false) {
      return null;
    }

    const req = await fetch(`${API_URL}/${type}/${id}/full`);
    const chars = (await fetch(`${API_URL}/${type}/${id}/characters`)) ?? [];
    if (req.ok) {
      const data = await req.json();
      const charactersData = await chars.json();
      data.data.characters = charactersData.data;
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
