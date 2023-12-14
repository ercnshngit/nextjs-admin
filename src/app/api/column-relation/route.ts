import { TableService } from "@/services/table.service";

export async function GET(
    request: Request,
  ) {
    const tableService = new TableService()
    try {
        return await tableService.getAllColumnRelations();
    } catch (error) {
        return new Response(JSON.stringify({status : "error" , message : error}), { status: 500 });        
    }
  }