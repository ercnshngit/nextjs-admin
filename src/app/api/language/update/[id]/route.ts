import { LanguageService } from "@/services/language.service";
import { LogService } from "@/services/log.service";

export async function POST(
  request: Request,
  params: { params: { id: number } }
) {
  const id = params.params.id
  const languageService = new LanguageService()
  try {
    const body = await request.json()
    return await languageService.updateLanguage(id, body)
  } catch (error) {
    const logService = new LogService();
        await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}