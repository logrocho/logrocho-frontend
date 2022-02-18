import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();

    url.pathname = "/home";

    return NextResponse.redirect(url);
  } else {
    return NextResponse.next();
  }
}
