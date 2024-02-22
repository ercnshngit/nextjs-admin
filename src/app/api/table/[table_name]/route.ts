import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  const service = new TableService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.createTable(table_name, body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

// TÜm verileri döner
export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  const service = new TableService(req);
  try {
    await service.securiyCheck();
    const res = await service.getTable(table_name);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
