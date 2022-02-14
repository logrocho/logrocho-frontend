import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getTokenData } from "../../lib/auth";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const data = await getTokenData(req.cookies.user_token);

  if (data) {
    if (data?.rol === "admin") {
      if (req.nextUrl.pathname === "/admin") {
        return NextResponse.redirect("/admin/bares");
      }

      return NextResponse.next();
    }

    return NextResponse.redirect("/login");
  }

  return NextResponse.redirect("/login");
}
