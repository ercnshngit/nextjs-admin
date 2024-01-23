import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { table_name: string; id: number } }
) {
  const table_name = params.table_name;
  const id = params.id;
  const service = new TableService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.updateTableWithId(table_name, id, body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
