import { LanguageService } from "@/services/language.service";

export async function GET(
  request: Request,
  params: { params: { code: string } }
) {
  const code = params.params.code
  const languageService = new LanguageService()
  try {
    return await languageService.getLanguageByCode(code)
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}