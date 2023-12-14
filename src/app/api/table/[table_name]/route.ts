import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";
import { Prisma } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  const tableService = new TableService();
  try {
    const res = await request.json();
    return await tableService.createTable(table_name, res);
  } catch (error) {
    const logService = new LogService();
        await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}

// TÜm verileri döner
export async function GET(
  request: Request,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  const tableService = new TableService();
  try {
    return await tableService.getTable(table_name);
  } catch (error) {
    const logService = new LogService();
        await logService.createLog({ error });
    console.log(error);
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}
