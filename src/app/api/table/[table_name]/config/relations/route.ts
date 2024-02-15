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

    const relation = await service.createTableRelations();
    const res = new Response(JSON.stringify(relation), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
