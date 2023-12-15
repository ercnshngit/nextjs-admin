import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";

export async function POST(
  request: Request,
  { params }: { params: { column_id: number } }
) {
  const column_id = params.column_id
  const tableService = new TableService()
  const body = await request.json()
  try {
    return await tableService.createCrudOption(column_id, body);
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}