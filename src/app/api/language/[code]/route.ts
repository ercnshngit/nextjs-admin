import { LanguageService } from "@/services/language.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: { code: string } }
) {
  const code = params.params.code
  const service = new LanguageService(req)
  try {
    await service.securiyCheck()
    const res = await service.getLanguageByCode(code)
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