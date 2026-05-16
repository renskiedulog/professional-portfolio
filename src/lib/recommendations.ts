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
    const query = `*[_type == "recommendations" && type == $type] | order(favorite desc, _createdAt desc){
      id,
      title,
      type,
      image,
      favorite,
      fromTmdb
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

const JIKAN_API_URL = process.env.NEXT_PUBLIC_JIKAN_API_URL!;
const TMDB_API_KEY = process.env.TMDB_API_KEY!;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export const GetRecommendationInfo = async ({
  id,
  searchType,
}: {
  id: string;
  searchType: "anime" | "movie" | "manhwa" | "manga" | "tv";
}) => {
  try {
    const allRecs = await sanityClient.fetch<SearchResult[]>(
      `*[_type == "recommendations"]{ id, type, fromTmdb }`
    );

    const rec = allRecs.find(
      (r) => String(r.id) === String(id) && r.type === searchType
    );

    if (!rec) return null;

    if (rec.fromTmdb) {
      const params = new URLSearchParams({ api_key: TMDB_API_KEY });

      const [movieRes, videosRes] = await Promise.all([
        fetch(`${TMDB_BASE_URL}/movie/${id}?${params}`),
        fetch(`${TMDB_BASE_URL}/movie/${id}/videos?${params}`),
      ]);

      if (!movieRes.ok) return null;

      const movie = await movieRes.json();
      const videos = videosRes.ok ? await videosRes.json() : { results: [] };

      const trailer = videos.results?.find(
        (v: any) => v.type === "Trailer" && v.site === "YouTube"
      );

      return {
        data: {
          mal_id: movie.id,
          title: movie.title,
          synopsis: movie.overview,
          status: movie.status,
          score: movie.vote_average,
          duration: movie.runtime ? `${movie.runtime} min` : undefined,
          images: {
            jpg: {
              image_url: movie.poster_path
                ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
                : "",
              large_image_url: movie.poster_path
                ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
                : "",
            },
          },
          genres: (movie.genres ?? []).map((g: any) => ({
            mal_id: g.id,
            name: g.name,
            type: "genre",
            url: "",
          })),
          trailer: trailer ? { youtube_id: trailer.key } : undefined,
          titles: [],
          characters: [],
        },
      };
    }

    let type: string = searchType;
    if (searchType === "manhwa") type = "manga";
    if (searchType === "movie") type = "anime";

    const req = await fetch(`${JIKAN_API_URL}/${type}/${id}/full`);
    const chars = await fetch(`${JIKAN_API_URL}/${type}/${id}/characters`);

    if (!req.ok) return null;

    const data = await req.json();
    const charactersData = chars.ok ? await chars.json() : { data: [] };
    data.data.characters = charactersData.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
