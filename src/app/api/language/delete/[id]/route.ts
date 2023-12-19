import { LanguageService } from "@/services/language.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  params: { params: { id: number } }
) {
  const id = params.params.id
  const languageService = new LanguageService()
  try {
    const res = await languageService.deleteLanguage(id)
    return cors(req, res);
  } catch (error) {
    await languageService.createLog({ error }, req.nextUrl.pathname);
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