import { DataLanguageService } from "@/services/data_language.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;

  const service = new DataLanguageService(req);
  try {
    await service.securiyCheck();
    const res = await service.getDataLanguage(id);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const service = new DataLanguageService(req);
  const id = params.id;

  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.updateDataLanguage(id, body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
