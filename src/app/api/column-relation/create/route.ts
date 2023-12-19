import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
) {
  const tableService = new TableService()
  const body = await req.json()
  try {
    const res = await tableService.createColumnRelation(body)
    return cors(req, res);
  } catch (error) {
    await tableService.createLog({ error }, req.nextUrl.pathname);
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}