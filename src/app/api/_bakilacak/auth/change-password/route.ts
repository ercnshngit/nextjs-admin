import { AuthService } from "@/services/auth/auth.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest)  {
  const service = new AuthService(request);
  try {
    await service.securiyCheck();
    const body = await request.json();
    const userId = request.headers.get("user_id");
    return cors(request, await service.changePassword(body, userId));
  } catch (error) {
    return service.createLogAndResolveError(error);
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
