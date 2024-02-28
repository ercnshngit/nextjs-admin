import { verifyJwtToken } from "@/libs/jose";
import { NextResponse } from "next/server";
import cors from "./utils/cors";

const isAuthPages = (url: string) =>
  url === "/" || url.startsWith("/?") || url.startsWith("/register");

export async function middleware(request: any) {
  const path = request.nextUrl.pathname;
  // api auth middleware
  if (request.nextUrl.pathname.startsWith("/api")) {
    try {
      const response = await NextResponse.next();
      if (request.method === "OPTIONS") {
        return cors(
          request,
          new Response(null, {
            status: 204,
          })
        );
      }
      return response;
    } catch (error: any) {
      console.log(error);
      return new Response(
        JSON.stringify({
          error: error.message == null ? error : error.message,
        }),
        {
          status: 500,
        }
      );
    }
  }

  // front auth middleware
  else {
    const { url, nextUrl, cookies } = request;
    const { value: token } = cookies.get("token") ?? { value: null };
    const hasVerifiedToken = token && (await verifyJwtToken(token));
    const isAuthPageRequested = isAuthPages(nextUrl.pathname);
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.next();
    }

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
