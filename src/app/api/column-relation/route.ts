import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";

export async function GET(
  request: Request,
) {
  const tableService = new TableService()
  try {
    const res = await tableService.getAllColumnRelations();
    return cors(request, res);
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(request, res);
  }
}