import { AuthService } from "@/services/auth/auth.service";
import { isAuthenticated } from "@/services/auth/authenticator";

export async function POST(request: Request) {
  const authentication = isAuthenticated(request);
  if (!authentication.status) {
    return new Response(JSON.stringify({ status: "error", message: authentication.message }), { status: authentication.httpStatus });
  } //auth controle
  const authService = new AuthService();
  const userPayload = authentication.user;
  try {
    const body = await request.json();
    return await authService.changePassword(body, userPayload.id);
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}
