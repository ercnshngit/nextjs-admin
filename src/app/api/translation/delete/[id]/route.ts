import { LogService } from "@/services/log.service";
import { TranslationService } from "@/services/translation.service";
import cors from "@/utils/cors";

export async function POST(
  req: Request,
  params: { params: { id: number } }
) {
  const id = params.params.id
  const translationService = new TranslationService()
  try {
    const res = await translationService.deleteTranslation(id)
    return cors(req, res);
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}