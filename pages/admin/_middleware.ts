import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getTokenData } from "../../lib/auth";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const data = await getTokenData(req.cookies.user_token);

  if (data) {
    if (data?.rol === "admin") {
      if (req.nextUrl.pathname === "/admin") {
        console.log(req.nextUrl)
        const url = req.nextUrl.clone();

        url.pathname = "/admin/bares";

        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    }

    const url = req.nextUrl.clone();

    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const url = req.nextUrl.clone();

  url.pathname = "/login";

  return NextResponse.redirect(url);
}
