import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/libs/jose";
import { isAuthenticated } from "./services/auth/authenticator";
import cors from "./utils/cors";
import { ApiRouteConstants } from "../constants/api-route.constants";

const isAuthPages = (url: string) =>
  url === "/" || url.startsWith("/?") || url.startsWith("/register");

const authPassPaths = [
  { path: "/api/auth/login", method: "POST", hasParams: false },
  { path: "/api/auth/register", method: "POST", hasParams: false },
  { path: "/api/block", method: "GET", hasParams: false },
  { path: "/api/menu", method: "GET", hasParams: false },
  { path: "/api/generals", method: "GET", hasParams: false },
  { path: "/api/component-render", method: "GET", hasParams: false },
  { path: "/api/translation/create", method: "POST", hasParams: false },
  { path: `/api/block/component/get/${ApiRouteConstants.PARAM}`, method: "GET", hasParams: true },
  { path: `/api/mail/send-contact-mail`, method: "POST", hasParams: false },
  { path: `/api/table/${ApiRouteConstants.PARAM}`, method: "GET", hasParams: true },
  { path: `/api/table/${ApiRouteConstants.PARAM}/${ApiRouteConstants.PARAM}`, method: "GET", hasParams: true },
  {
    path: `/api/table/${ApiRouteConstants.PARAM}/byslug/${ApiRouteConstants.PARAM}`,
    method: "GET",
    hasParams: true,
  },
  {
    path: `/api/table/${ApiRouteConstants.PARAM}/update/${ApiRouteConstants.PARAM}`,
    method: "GET",
    hasParams: true,
  },
];

function isPathHasAuthPass(path: string, request: any): boolean {
  let isTrue = false;
  authPassPaths.forEach((authPassPath) => {
    if (authPassPath.hasParams) {
      const pathSplit = path.split("/");
      const authPassPathSplit = authPassPath.path.split("/");
      if (pathSplit.length === authPassPathSplit.length) {
        // pathlerin parçalanmıs hallerının eleman mıtkarı kontrol edılıyor
        let isSame = true;
        for (let i = 0; i < pathSplit.length; i++) {
          // pathlerin her bir elemanı kontrol ediliyor
          if (authPassPathSplit[i] === ApiRouteConstants.PARAM) {
            // eğer parametreyse kontrol edilmiyor VE BU SEKILDE o / x / arasındakı parametre degerıde pass gecılıyor
            continue;
          }
          if (pathSplit[i] !== authPassPathSplit[i]) {
            // eğer parametre değilse ve pathlerin elemanları eşit değilse false dönüyor
            isSame = false;
            break;
          }
        }
        if (isSame && authPassPath.method === request.method) {
          // eğer pathlerin elemanları eşitse ve parametre değilse true dönüyor
          isTrue = true;
        }
      }
    }
    if (path.includes(authPassPath.path)) {
      // eğer pathlerin parçalanmıs hallerının eleman mıtkarı eşit değilse ve pathlerin içerisinde authPassPath varsa true dönüyor
      if (authPassPath.method === request.method) {
        isTrue = true;
      }
    }
  });
  return isTrue;
}

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
    if (isPathHasAuthPass(path, request)) {
      console.log("auth pass başarılı");
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
