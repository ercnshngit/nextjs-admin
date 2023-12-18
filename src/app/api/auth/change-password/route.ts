import { AuthService } from "@/services/auth/auth.service";
import { isAuthenticated } from "@/services/auth/authenticator";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";

export async function POST(request: Request) {
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
    const logService = new LogService();
    await logService.createLog({ error });
    const response =  new Response(JSON.stringify({ status: "error", message: error }));
    return cors(request, new Response(JSON.stringify({ status: "error", message: error })));
  }
}
