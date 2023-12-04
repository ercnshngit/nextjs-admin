import { TableService } from "@/services/table.service";

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
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}