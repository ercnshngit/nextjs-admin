import { TableService } from "@/services/table.service";
import { config } from "dotenv";

config();    
// Bir veritabanındakı tablo isimlerini , kolon isimlerini ve kolon tiplerini döndürür.
export async function GET(request: Request) {
    const tableService = new TableService()
    try {
        return await tableService.getAllTableWithDatas();
    } catch (error) {
        return new Response(JSON.stringify({ status: "error", message: error }));
    }
}

