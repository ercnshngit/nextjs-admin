import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ) {
    const tableService = new TableService();
    try {
      const res = await tableService.createTableConfig();
      return cors(req, res);
    } catch (error) {
      await tableService.createLog({ error }, req.nextUrl.pathname);
      const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
      return cors(req, res);
    }
  }