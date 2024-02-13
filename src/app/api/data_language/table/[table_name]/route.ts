import { DataLanguageService } from "@/services/data_language.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;

  const service = new DataLanguageService(req);
  try {
    await service.securiyCheck();
    const res = await service.getDataLanguagesByTable(table_name);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
