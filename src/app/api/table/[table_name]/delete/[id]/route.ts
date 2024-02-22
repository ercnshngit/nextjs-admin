import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { table_name: string; id: number } }
) {
  const table_name = params.table_name;
  const id = params.id;
  const service = new TableService(req);
  try {
    await service.securiyCheck();
    const res = await service.deleteTableWithId(table_name, id);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
