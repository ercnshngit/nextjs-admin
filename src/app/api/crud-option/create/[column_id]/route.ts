import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";

export async function POST(
  req: Request,
  { params }: { params: { column_id: number } }
) {
  const column_id = params.column_id
  const tableService = new TableService()
  const body = await req.json()
  try {
    const res = await tableService.createCrudOption(column_id, body);
    return cors(req, res);
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}