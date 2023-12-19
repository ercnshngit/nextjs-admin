import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";

// TÜm verileri döner
export async function POST(
  req: Request,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  const tableService = new TableService();
  try {
    const body = await req.json();
    const res = await tableService.getTableWithWhere(table_name, body);
    return cors(req, res);
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}
