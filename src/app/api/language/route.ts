import { LanguageService } from "@/services/language.service";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const service = new LanguageService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.createLanguage(body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const service = new LanguageService(req);
  try {
    await service.securiyCheck();
    const res = await service.getLanguages();
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
