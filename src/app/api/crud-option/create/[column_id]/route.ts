import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { column_id: number } }
) {
  const column_id = params.column_id
  const service = new TableService(req)
  const body = await req.json()
  try {
    await service.securiyCheck();
    const res = await service.createCrudOption(column_id, body);
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