import { TranslationService } from "@/services/translation.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  const key = params.key
  const translationService = new TranslationService(req.nextUrl.pathname)
  try {
    const res = await translationService.getTranslationsWithKey(key)
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await translationService.createLog({ error });
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