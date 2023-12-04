import { TableService } from "@/services/table.service";

export async function GET(
    request: Request,
    { params }: { params: { table_name: string , id : number } }
) { 
    const table_name = params.table_name
    const tableService = new TableService()
    try {
        return await tableService.getTableConfig(table_name);
      } catch (error) {
        return new Response(JSON.stringify({status : "error" , message : error}));        
      }
}

