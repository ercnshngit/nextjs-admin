import { TableService } from "@/services/table.service";

export async function POST(
    request: Request,
    { params }: { params: { table_name: string , id: number   } }
) { 
    const table_name = params.table_name
    const table_id = params.id
    const tableService = new TableService()
    try {
        const body = await request.json()
        return await tableService.updateTableConfig(table_id,body);
      } catch (error) {
        return new Response(JSON.stringify({status : "error" , message : error}));        
      }
}