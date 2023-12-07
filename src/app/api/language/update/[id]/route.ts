import { LanguageService } from "@/services/language.service";

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
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}