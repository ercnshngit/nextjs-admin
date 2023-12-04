import { TranslationService } from "@/services/translation.service";

export async function GET(
    request: Request,
    params : {params : {code : string}}
  ) {
    const code = params.params.code
    const translationService = new TranslationService()
    try {
        return await translationService.getLanguageByCode(code)
    } catch (error) {
        return new Response(JSON.stringify({status : "error" , message : error}));        
    }
  }