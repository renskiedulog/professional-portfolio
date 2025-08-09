import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api.jikan.moe/v4";

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
    const body = await req.json();
    const { searchTerm, searchType, limit, page } = body;

    if (!searchTerm || !searchType) {
      return NextResponse.json(
        { error: "Search Term and Search Type are required." },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({
      q: searchTerm,
    });

    if (limit) params.append("limit", limit.toString());
    if (page) params.append("page", page.toString());

    const url = `${API_URL}/${searchType}?${params.toString()}`;

    // Fetch Search Results
    const searchReq = await fetch(url);

    const data = await searchReq.json();

    // Sanitize Data
    let returnedData: any = {
      hasNextPage: data.pagination.has_next_page,
    };
    if (data && data?.data) {
      // Returns only the necessary data
      const processedSearchResults = data.data.map((item: any) => {
        return {
          id: item.mal_id,
          title: item.title,
          image: item.images?.jpg?.image_url || item.images?.webp?.image_url,
          type: item.type,
        };
      });
      returnedData = {
        ...returnedData,
        data: processedSearchResults,
      };
    }

    return NextResponse.json({
      message: "Search Successful.",
      status: 200,
      ...returnedData,
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
