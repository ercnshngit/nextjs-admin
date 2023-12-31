import { LanguageService } from "@/services/language.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: { code: string } }
) {
  const code = params.params.code
  const languageService = new LanguageService(req.nextUrl.pathname)
  try {
    const res = await languageService.getLanguageByCode(code)
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