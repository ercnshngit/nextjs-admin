import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";

export async function POST(
  request: Request,
) {
  const tableService = new TableService()
  const body = await request.json()
  try {
    const res = await tableService.createColumnRelation(body)
    return cors(request, res);
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    const res = new Response(JSON.stringify({ status: "error", message: error }));
    return cors(request, res);
  }
}