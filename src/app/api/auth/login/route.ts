import { AuthService } from "@/services/auth/auth.service";
import cors from "@/utils/cors";
import { isAuthenticated } from "@/services/auth/authenticator";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const authentication = isAuthenticated(request);
  const authService = new AuthService();
  try {
    const body = await request.json();
    if (body == null) {
      return cors(
        request,
        new Response(
          JSON.stringify({ status: "error", message: "body is null" })
        )
      );
    }
    return cors(request, await authService.login(body, false));
  } catch (error: any) {
    await authService.createLog({ error }, request.nextUrl.pathname);
    return cors(request, new Response(JSON.stringify(error), { status: 500 }));
  }
}

export async function OPTIONS(request: Request) { 
  return cors(
    request,
    new Response(null, {
      status: 204,
    })
  );
}
