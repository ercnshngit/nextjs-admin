import { LogService } from "@/services/log.service";
import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";

export async function GET(
  req: Request,
  ) {
    const tableService = new TableService();
    try {
      const res = await tableService.createTableConfig();
      return cors(req, res);
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
      return cors(req, res);
    }
  }