import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getTokenData } from "../../lib/auth";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { user_token } = req.cookies;

  const data = await getTokenData(user_token);

  if (data) {
    const url = req.nextUrl.clone();
    url.pathname = `/usuario/${data.id}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
