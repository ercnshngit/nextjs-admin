import { LogService } from "@/services/log.service";
import { TranslationService } from "@/services/translation.service";

export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  const key = params.key
  const translationService = new TranslationService()
  try {
    return await translationService.getTranslationsWithKey(key)
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}