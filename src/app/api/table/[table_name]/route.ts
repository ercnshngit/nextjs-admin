import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  const tableService = new TableService();
  try {
    const body = await req.json();
    const res = await tableService.createTable(table_name, body);
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await tableService.createLog({ error }, req.nextUrl.pathname);
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}

// TÜm verileri döner
export async function GET(
  req: NextRequest,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  const tableService = new TableService();
  try {
    const res = await tableService.getTable(table_name);
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await tableService.createLog({ error }, req.nextUrl.pathname);
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}
