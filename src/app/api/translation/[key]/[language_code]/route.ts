import { LogService } from "@/services/log.service";
import { TranslationService } from "@/services/translation.service";

export async function GET(
  request: Request,
  { params }: { params: { key: string, language_code: string } }
) {
  const key = params.key
  const lang_code = params.language_code
  const translationService = new TranslationService()
  try {
    return await translationService.getTranslationWithKeyAndLangId(key, lang_code);
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}