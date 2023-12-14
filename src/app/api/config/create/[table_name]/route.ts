import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";

export async function GET(
  request: Request,
  { params }: { params: { table_name: string} }
) {
  const table_name = params.table_name;
  const tableService = new TableService();
  try {
    return await tableService.createTableConfigWithTableName(table_name);
  } catch (error) {
    const logService = new LogService();
        await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}