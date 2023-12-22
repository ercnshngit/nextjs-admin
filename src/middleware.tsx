import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/libs/jose";
import { isAuthenticated } from "./services/auth/authenticator";

const isAuthPages = (url: string) =>
  url === "/" || url.startsWith("/?") || url.startsWith("/register");

const authPassPaths = ["/api/auth/login", "/api/auth/register"];

export async function middleware(request: any) {
  console.log(request.nextUrl.pathname);
  const path = request.nextUrl.pathname;

  // api auth middleware
  if (request.nextUrl.pathname.startsWith("/api")) {
    const response = await NextResponse.next();
    response.headers.append("Access-Control-Allow-Credentials", "true");
    response.headers.append(
      "Access-Control-Allow-Origin",
      "https://trakyateknopark.com.tr"
    );
    response.headers.append("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    response.headers.append(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    if (authPassPaths.includes(path)) {
      // Auth'tan muaf olan apiler kontrol ediliyor.
      return response;
    }
    const isAuth = await isAuthenticated(request);
    if (!isAuth.status) {
      return new Response(JSON.stringify({ error: isAuth.message }), {
        status: 401,
      });
    } else {
      request.headers.user_id = isAuth.user.id; // request'e user_id ekleniyor. headers'a eklenmesinin sebebi, request'in her yerinde kullanılabilmesi.
      response.headers.set("user_id", isAuth.user.id); // response'a user_id ekleniyor. headers'a eklenmesinin sebebi, response'un her yerinde kullanılabilmesi.

      return response;
    }
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
