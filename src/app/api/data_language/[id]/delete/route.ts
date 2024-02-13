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
    const res = await service.deleteDataLanguage(id);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
