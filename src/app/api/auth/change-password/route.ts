import { AuthService } from "@/services/auth/auth.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest)  {
  const authService = new AuthService(request.nextUrl.pathname);
  try {
    const body = await request.json();
    const userId = request.headers.get("user_id");
    return cors(request, await authService.changePassword(body, userId));
  } catch (error) {
    await authService.createLog({ error });
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
