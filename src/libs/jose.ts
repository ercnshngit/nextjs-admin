import { jwtVerify } from "jose";

export function getJwtSecretKey() {
  const secret = process.env.JWT_ACCESS_SECRET || "secret";
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }

  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string) {
  try {
    console.log("token", token);
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    console.log("payload", payload);

    return payload;
  } catch (error) {
    return null;
  }
}
