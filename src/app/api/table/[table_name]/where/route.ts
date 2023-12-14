import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";

// TÜm verileri döner
export async function POST(
  request: Request,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  const tableService = new TableService();
  try {
    const res = await request.json();
    return await tableService.getTableWithWhere(table_name, res);
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify({ error: JSON.stringify(error) }), {
      status: 400,
    });
  }
}
