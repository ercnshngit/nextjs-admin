import { TranslationService } from "@/services/translation.service";

export async function POST(
    request: Request,
) { 
    const translationService = new TranslationService()
    try {
        const body = await request.json()
        return await translationService.createLanguage(body)
      } catch (error) {
        return new Response(JSON.stringify({status : "error" , message : error}));        
      }
}

export async function GET(
    request: Request,
  ) {
    const translationService = new TranslationService()
    try {
        return await translationService.getLanguages()
    } catch (error) {
        return new Response(JSON.stringify({status : "error" , message : error}));        
    }
  }