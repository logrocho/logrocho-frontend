import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getTokenData } from "../api/auth";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

  const data = await getTokenData(req.cookies.user_token);

  if(data.data){

    // Redireccionar a admin si el usuario lo permite
    if(data.data.rol === 'admin'){

      return NextResponse.redirect('/admin');
  
    } else if (data.data.rol === 'user') {
  
      // TODO: Si el usuario esta logeado e intenta acceder a /login redireccionar a su perfil
      return NextResponse.redirect("/login");
  
    }

  }else{

    return NextResponse.next();

  }

  return NextResponse.redirect("/");
}
