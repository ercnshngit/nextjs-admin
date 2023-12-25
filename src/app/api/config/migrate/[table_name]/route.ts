import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { table_name: string}}
) {
    console.log("table_name", params.table_name);
    const tableService = new TableService(req.nextUrl.pathname);
    try {
      const res = await tableService.migrateTableConfig(params.table_name);
      return cors(req, res);
    } catch (error) {
      await tableService.createLog({ error });
      const res = new Response(
        JSON.stringify({ status: "error", message: error }),
        { status: 500 }
      );
      return cors(req, res);
    }
  }