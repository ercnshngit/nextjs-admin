import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { table_name: string}}
) {
    console.log("table_name", params.table_name);
    const service = new TableService(req);
    try {
      await service.securiyCheck();
      const res = await service.migrateTableConfig(params.table_name);
      return cors(req, res);
    } catch (error) {
      return await service.createLogAndResolveError(error);
    }
  }