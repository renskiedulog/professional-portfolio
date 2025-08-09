import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// const req = await fetch(
//   "https://api.jikan.moe/v4/manga?q=mercenary%20enrollment"
// );
// const res = await req.json();

const API_URL = "https://api.jikan.moe/v4";

export async function POST(req: NextRequest) {
  //   const cookieStore = await cookies();
  //   const auth = cookieStore.get("auth");

  //   if (auth?.value !== "true") {
  //     return NextResponse.redirect(
  //       new URL("/extra/recommendations/settings/login", req.url)
  //     );
  //   }

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

    const searchRes = await searchReq.json();

    return NextResponse.json({
      message: "Search Successful.",
      status: 200,
      data: searchRes,
    });
  } catch (error) {
    console.error("POST /api/search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  return NextResponse.json({
    message: "Search request received",
  });
}
