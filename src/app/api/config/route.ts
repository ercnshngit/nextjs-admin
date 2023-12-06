import { TableService } from "@/services/table.service";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const tableService = new TableService();
  try {
    return await tableService.getConfigs();
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}
