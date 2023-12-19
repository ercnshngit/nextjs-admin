import { LogService } from "@/services/log.service";
import { TranslationService } from "@/services/translation.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { key: string, language_code: string } }
) {
  const key = params.key
  const lang_code = params.language_code
  const translationService = new TranslationService()
  try {
    const res = await translationService.getTranslationWithKeyAndLangId(key, lang_code);
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await translationService.createLog({ error }, req.nextUrl.pathname);
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}