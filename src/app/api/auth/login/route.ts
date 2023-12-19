import { AuthService } from "@/services/auth/auth.service";
import { Response } from "express";
import { isAuthenticated } from "@/services/auth/authenticator";
import { LogService } from "@/services/log.service";
import { NextResponse } from "next/server";
import { ServerMessages } from "../../../../../constants/messages.constants";

export async function POST(request: Request) {
  const authService = new AuthService();
  try {
    const body = await request.json();
    return await authService.login(body, false);
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify(ServerMessages[500]), {
      status: 500,
    });
  }
}
