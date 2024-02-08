import { TranslationService } from "@/services/translation.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
) {
  const service = new TranslationService(req)
  try {
    await service.securiyCheck();
    const body = await req.json()
    const res = await service.createTranslation(body)
    return cors(req, res);
  } catch (error : any) {
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