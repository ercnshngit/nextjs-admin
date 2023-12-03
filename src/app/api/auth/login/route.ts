import { AuthService } from "@/services/auth/auth.service";
import { Response } from 'express';
import { isAuthenticated } from "@/services/auth/authenticator";

export async function POST(
    request: Request,
) { 
    const authService = new AuthService()
    try {
        const body = await request.json()
        return await authService.login(body,false)
      } catch (error) {
        return new Response(JSON.stringify({status : "error" , message : error}));        
      }
}