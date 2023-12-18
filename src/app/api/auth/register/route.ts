import { AuthService } from "@/services/auth/auth.service";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";
import { Response } from 'express';
import { NextApiResponse } from "next";

export async function POST(
  request: Request,
) {
  const authService = new AuthService()
  try {
    const body = await request.json()
    return cors(request, await authService.registerUser(body));
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return cors(request, new Response(JSON.stringify({ status: "error", message: error })));
  }
}