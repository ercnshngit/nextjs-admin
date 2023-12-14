import { LogService } from "@/services/log.service";
import { TranslationService } from "@/services/translation.service";

export async function POST(
  request: Request,
  params: { params: { id: number } }
) {
  const id = params.params.id
  const translationService = new TranslationService()
  try {
    return await translationService.deleteTranslation(id)
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}