import { LanguageService } from "@/services/language.service";

export async function POST(
  request: Request,
) {
  const languageService = new LanguageService()
  try {
    const body = await request.json()
    return await languageService.createLanguage(body)
  } catch (error) {
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
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}