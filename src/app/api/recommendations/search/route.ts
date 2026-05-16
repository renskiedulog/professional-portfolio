import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JIKAN_API_URL = process.env.NEXT_PUBLIC_JIKAN_API_URL!;
const TMDB_API_KEY = process.env.TMDB_API_KEY!;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

async function searchTMDB(searchTerm: string, page: number) {
  const params = new URLSearchParams({
    query: searchTerm,
    page: String(page || 1),
    api_key: TMDB_API_KEY,
  });

  const res = await fetch(`${TMDB_BASE_URL}/search/movie?${params}`);
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);

  const data = await res.json();

  return {
    hasNextPage: data.page < data.total_pages,
    data: data.results
      .filter((item: any) => item.poster_path)
      .map((item: any) => ({
        id: item.id,
        title: item.title,
        image: `${TMDB_IMAGE_BASE}${item.poster_path}`,
        type: "movie",
        fromTmdb: true,
      })),
  };
}

async function searchJikan(
  searchTerm: string,
  searchType: string,
  limit: number,
  page: number
) {
  let resultsType = searchType;
  let type = searchType;

  if (searchType === "anime") resultsType = "tv";
  if (searchType === "manhwa") {
    resultsType = searchType;
    type = "manga";
  }

  const params = new URLSearchParams({ q: searchTerm });
  if (limit) params.append("limit", limit.toString());
  if (page) params.append("page", page.toString());
  if (resultsType) params.append("type", resultsType);

  const res = await fetch(`${JIKAN_API_URL}/${type}?${params}`);
  const data = await res.json();

  return {
    hasNextPage: data.pagination?.has_next_page ?? false,
    data: (data.data ?? []).map((item: any) => ({
      id: item.mal_id,
      title: item.title,
      image: item.images?.jpg?.image_url || item.images?.webp?.image_url,
      type: item.type,
    })),
  };
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth");

  if (auth?.value !== "true") {
    return NextResponse.json(
      { error: "Request Denied, Permission not granted." },
      { status: 401 }
    );
  }

  try {
    const { searchTerm, searchType, limit, page } = await req.json();

    if (!searchTerm || !searchType) {
      return NextResponse.json(
        { error: "Search Term and Search Type are required." },
        { status: 400 }
      );
    }

    const result =
      searchType === "movie"
        ? await searchTMDB(searchTerm, page)
        : await searchJikan(searchTerm, searchType, limit, page);

    return NextResponse.json({
      message: "Search Successful.",
      status: 200,
      ...result,
    });
  } catch (error) {
    console.error("POST /api/recommendations/search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth");

  if (auth?.value !== "true") {
    return NextResponse.json(
      { error: "Request Denied, Permission not granted." },
      { status: 401 }
    );
  } else {
    return NextResponse.json(
      { error: "All systems running." },
      { status: 200 }
    );
  }
}
