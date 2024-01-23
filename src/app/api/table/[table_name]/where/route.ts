import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

// TÜm verileri döner
export async function POST(
  req: NextRequest,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  const service = new TableService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.getTableWithWhere(table_name, body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
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