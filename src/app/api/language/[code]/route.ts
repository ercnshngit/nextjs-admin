import { LanguageService } from "@/services/language.service";
import { LogService } from "@/services/log.service";

export async function GET(
  request: Request,
  params: { params: { code: string } }
) {
  const code = params.params.code
  const languageService = new LanguageService()
  try {
    return await languageService.getLanguageByCode(code)
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}