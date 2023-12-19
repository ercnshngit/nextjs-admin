import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { table_name: string} }
) {
  const table_name = params.table_name;
  const tableService = new TableService();
  try {
    const res = await tableService.createTableConfigWithTableName(table_name);
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await tableService.createLog({ error }, req.nextUrl.pathname);
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}