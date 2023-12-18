import { LogService } from "@/services/log.service";
import { TranslationService } from "@/services/translation.service";
import cors from "@/utils/cors";

export async function GET(
  req: Request,
  { params }: { params: { key: string, language_code: string } }
) {
  const key = params.key
  const lang_code = params.language_code
  const translationService = new TranslationService()
  try {
    const res = await translationService.getTranslationWithKeyAndLangId(key, lang_code);
    return cors(req, res);
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}