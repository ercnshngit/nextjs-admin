import { AuthService } from "@/services/auth/auth.service";
import { isAuthenticated } from "@/services/auth/authenticator";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const authentication = isAuthenticated(request);
  if (!authentication.status) {
    return cors(request, new Response(JSON.stringify({ status: "error", message: authentication.message }), { status: authentication.httpStatus }));
  } //auth controle
  const authService = new AuthService();
  const userPayload = authentication.user;
  try {
    const body = await request.json();
    return cors(request, await authService.changePassword(body, userPayload.id));
  } catch (error) {
    await authService.createLog({ error }, request.nextUrl.pathname);
    return cors(request, new Response(JSON.stringify({ status: "error", message: error }), { status: 500 }));
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
