import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getTokenData } from "../../lib/auth";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { user_token } = req.cookies;

  const data = await getTokenData(user_token);

  if (data) {
    //TODO: En un futuro esta redireccion sera para ir al perfil
    return NextResponse.redirect("/admin/bares");
  }

  return NextResponse.next();
}
