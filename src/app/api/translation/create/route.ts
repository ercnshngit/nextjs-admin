import { LogService } from "@/services/log.service";
import { TranslationService } from "@/services/translation.service";

export async function POST(
  request: Request,
) {
  const translationService = new TranslationService()
  try {
    const body = await request.json()
    return await translationService.createTranslation(body)
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}