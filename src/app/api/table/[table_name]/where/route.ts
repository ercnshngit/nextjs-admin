import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

// TÜm verileri döner
export async function POST(
  req: NextRequest,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  const tableService = new TableService(req.nextUrl.pathname);
  try {
    const body = await req.json();
    const res = await tableService.getTableWithWhere(table_name, body);
    return cors(req, res);
  } catch (error) {
    console.log(error)
    await tableService.createLog({ error });
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}

export async function OPTIONS(request: Request) { 
  return cors(
    request,
    new Response(null, {
      status: 204,
    })
  );
}