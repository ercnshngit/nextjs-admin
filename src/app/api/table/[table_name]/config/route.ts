import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";

export async function GET(
  request: Request,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  const tableService = new TableService();
  try {
    return await tableService.getTableConfig(table_name);
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}

export async function POST(
  request: Request,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  const tableService = new TableService();
  try {
    const body = await request.json();
    return await tableService.updateTableConfig(table_name, body);
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}
