import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { config } from "dotenv";
import { NextRequest } from "next/server";

config();
// Bir veritabanındakı tablo isimlerini , kolon isimlerini ve kolon tiplerini döndürür.
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const service = new TableService(req);
  try {
    await service.securiyCheck();
    const res = await service.getAllTableWithDatas();
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
