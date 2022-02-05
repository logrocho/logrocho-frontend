import * as jose from "jose";

export async function getTokenData(token: string) {
  interface TokenData {
    correo: string;
    rol: string;
  }

  if (!token) {
    return null;
  }

  try {
    const verified = await jose.jwtVerify(
      token,
      new TextEncoder().encode("pepito")
    );
    return verified.payload?.data as TokenData;
  } catch (error) {
    return null;
  }
}
