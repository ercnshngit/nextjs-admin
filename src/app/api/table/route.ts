import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { config } from "dotenv";
import { NextRequest } from "next/server";

config();
// Bir veritabanındakı tablo isimlerini , kolon isimlerini ve kolon tiplerini döndürür.
export async function GET(req: NextRequest) {
  const tableService = new TableService(req.nextUrl.pathname);
  try {
    const res = await tableService.getAllTableWithDatas();
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await tableService.createLog({ error });
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
