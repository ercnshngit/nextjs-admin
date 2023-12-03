import { TranslationService } from "@/services/translation.service";

export async function POST(
    request: Request,
    params : {params : {id : number}}
) { 
    const id = params.params.id
    const translationService = new TranslationService()
    try {
        return await translationService.deleteTranslation(id)
      } catch (error) {
        return new Response(JSON.stringify({status : "error" , message : error}));        
      }
}