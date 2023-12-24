import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/libs/jose";
import { isAuthenticated } from "./services/auth/authenticator";
import cors from "./utils/cors";

const isAuthPages = (url: string) =>
  url === "/" || url.startsWith("/?") || url.startsWith("/register");

const authPassPaths = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/block",
  "/api/menu",
  "/api/generals",
];

export async function middleware(request: any) {
  const path = request.nextUrl.pathname;

  // api auth middleware
  if (request.nextUrl.pathname.startsWith("/api")) {
    const response = await NextResponse.next();
    if (request.method === "OPTIONS") {
      return cors(
        request,
        new Response(null, {
          status: 204,
        })
      );
    }
    if (true) {
      //Geçici koruma, önyüzde getleri alabilmem lazım tabi auth patlamış olabilir
      // Auth'tan muaf olan apiler kontrol ediliyor.
      return response;
    }
    const isAuth = await isAuthenticated(request);
    if (!isAuth.status) {
      return new Response(JSON.stringify({ error: isAuth.message }), {
        status: 401,
      });
    } else {
      response.headers.set("user_id", isAuth.user?.id); // response'a user_id ekleniyor. headers'a eklenmesinin sebebi, response'un her yerinde kullanılabilmesi.
      return response;
    }
    return response;
  }
  // front auth middleware
  else {
    const { url, nextUrl, cookies } = request;
    const { value: token } = cookies.get("token") ?? { value: null };
    const hasVerifiedToken = token && (await verifyJwtToken(token));
    const isAuthPageRequested = isAuthPages(nextUrl.pathname);
    if (isAuthPageRequested) {
      if (!hasVerifiedToken) {
        const response = NextResponse.next();
        response.cookies.delete("token");
        return response;
      }
      request.nextUrl.pathname = "/dashboard";
      return NextResponse.redirect(request.nextUrl);
    }

    if (!hasVerifiedToken) {
      const searchParams = new URLSearchParams(nextUrl.searchParams);
      searchParams.set("next", nextUrl.pathname);

      const response = NextResponse.redirect(new URL(`/?${searchParams}`, url));
      response.cookies.delete("token");

      return response;
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
