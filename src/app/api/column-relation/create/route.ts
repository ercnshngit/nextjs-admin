import { TableService } from "@/services/table.service";

export async function POST(
    request: Request,
  ) {
    const tableService = new TableService()
    const body = await request.json()
    try {
        return await tableService.createColumnRelation(body);
    } catch (error) {
        return new Response(JSON.stringify({status : "error" , message : error}));        
    }
  }