import { TranslationService } from "@/services/translation.service";

export async function POST(
    request: Request,
) { 
    const translationService = new TranslationService()
    try {
        const body = await request.json()
        return await translationService.createTranslation(body)
      } catch (error) {
        return new Response(JSON.stringify({status : "error" , message : error}));        
      }
}