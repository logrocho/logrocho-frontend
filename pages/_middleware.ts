import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

  if(req.nextUrl.pathname === '/') {

    return NextResponse.redirect('/home');

  } else {

    return NextResponse.next();

  }

}
