import { LanguageService } from "@/services/language.service";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
) {
  const languageService = new LanguageService(req.nextUrl.pathname)
  try {
    const body = await req.json()
    const res = await languageService.createLanguage(body)
    return cors(req, res);
  } catch (error) {
    await languageService.createLog({ error });
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}

export async function GET(
  req: NextRequest,
) {
  const languageService = new LanguageService(req.nextUrl.pathname)
  try {
    const res = await languageService.getLanguages()
    return cors(req, res);
  } catch (error) {
    await languageService.createLog({ error });
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
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