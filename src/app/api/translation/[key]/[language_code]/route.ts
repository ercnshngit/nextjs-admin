import { TranslationService } from "@/services/translation.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { key: string, language_code: string } }
) {
  const service = new TranslationService(req)
  try {
    await service.securiyCheck();
    const key = params.key
    const lang_code = params.language_code
    const res = await service.getTranslationWithKeyAndLangId(key, lang_code);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export async function OPTIONS(request: Request) { 
  return cors(
    request,
    new Response(null, {
      status: 204,
    })
  );
}