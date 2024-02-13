import { DataLanguageService } from "@/services/data_language.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const service = new DataLanguageService(req);
  try {
    await service.securiyCheck();
    const res = await service.getDataLanguages();
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export async function POST(req: NextRequest) {
  const service = new DataLanguageService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.createDataLanguage(body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
