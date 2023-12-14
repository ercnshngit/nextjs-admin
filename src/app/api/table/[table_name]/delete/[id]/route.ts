import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";

export async function GET(
  request: Request,
  { params }: { params: { table_name: string; id: number } }
) {
  const table_name = params.table_name;
  const id = params.id;
  const tableService = new TableService();
  try {
    return await tableService.deleteTableWithId(table_name, id);
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}
