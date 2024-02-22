import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  const service = new TableService(req);
  try {
    await service.securiyCheck();
    const res = await service.getTableConfig(table_name);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  const service = new TableService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.updateTableConfig(table_name, body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
