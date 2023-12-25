import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { table_name: string; id: number } }
) {
  const table_name = params.table_name;
  const id = params.id;
  const tableService = new TableService(req.nextUrl.pathname);
  try {
    const res = await tableService.deleteTableWithId(table_name, id);
    return cors(req, res);
  } catch (error) {
    console.log(error);
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
