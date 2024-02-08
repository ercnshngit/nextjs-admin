import { TranslationService } from "@/services/translation.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  params: { params: { id: number } }
) {
  const id = params.params.id
  const service = new TranslationService(req)
  try {
    await service.securiyCheck();
    const body = await req.json()
    const res = await service.updateTranslation(id, body);
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