import { AuthService } from "@/services/auth/auth.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const service = new AuthService(request);
  try {
    await service.securiyCheck();
    const body = await request.json();
    if (body == null) {
      return cors(
        request,
        new Response(
          JSON.stringify({ status: "error", message: "body is null" })
        )
      );
    }
    return cors(request, await service.login(body, false));
  } catch (error: any) {
    return await service.createLogAndResolveError(error);
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
