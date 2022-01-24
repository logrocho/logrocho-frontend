import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getTokenData } from "../api/auth";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

  const data = await getTokenData(req.cookies.user_token);

  if(data.data){

    if(data.data.rol === 'admin'){

      return NextResponse.next();
  
    } else {
  
      return NextResponse.redirect("/login");
  
    }

  }

  return NextResponse.redirect("/login");
}
