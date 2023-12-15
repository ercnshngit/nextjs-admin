import { LanguageService } from "@/services/language.service";
import { LogService } from "@/services/log.service";

export async function POST(
  request: Request,
) {
  const languageService = new LanguageService()
  try {
    const body = await request.json()
    return await languageService.createLanguage(body)
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}

export async function GET(
  request: Request,
) {
  const languageService = new LanguageService()
  try {
    return await languageService.getLanguages()
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}