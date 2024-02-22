import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { table_name: string; slug: string } }
) {
  const table_name = params.table_name;
  const slug = params.slug;
  const service = new TableService(req);
  try {
    await service.securiyCheck();
    const res = await service.getTableByColumn({
      table_name: table_name,
      column: "slug",
      value: slug,
    });
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
