import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { API_URL } from "../lib/const";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  
  if (req.nextUrl.pathname === "/admin") {
    
    const jwt = await fetch(API_URL + "verifyAuth", {
      
        method: "GET",
      
        headers: {
        
            Authorization: `Bearer ${req.cookies.user_token}`,
      
        },
    
    })
    
    .then((result):Promise<any> => result.json())
    
    .catch((error):NextResponse => {
    
        return NextResponse.json({ error: error });
    
    });


    if(jwt.result){

        return NextResponse.next();

    }else{

        return NextResponse.redirect('/login');

    }

  }

}
