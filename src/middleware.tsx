import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/libs/jose";

const isAuthPages = (url: string) =>
  url === "/" || url.startsWith("/?") || url.startsWith("/register");

export async function middleware(request: any) {
  const { url, nextUrl, cookies } = request;
  const { value: accessToken } = cookies.get("accessToken") ?? { value: null };
  const hasVerifiedToken = accessToken && (await verifyJwtToken(accessToken));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);
  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete("accessToken");
      return response;
    }
    request.nextUrl.pathname = "/dashboard";
    return NextResponse.redirect(request.nextUrl);
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);

    const response = NextResponse.redirect(new URL(`/?${searchParams}`, url));
    response.cookies.delete("accessToken");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
