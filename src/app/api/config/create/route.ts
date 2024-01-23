import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const service = new TableService(req);
  try {
    await service.securiyCheck();
    const res = await service.createTableConfig();
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
