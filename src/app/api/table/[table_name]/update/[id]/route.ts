import { TableService } from "@/services/table.service";

export async function POST(
    request: Request,
    { params }: { params: { table_name: string , id : number } }
    ) { 
        const table_name = params.table_name
        const id = params.id 
        const tableService = new TableService()
        try {
            const res = await request.json()
            return await tableService.updateTableWithId(table_name , id , res)
        } catch (error) {
            return new Response(JSON.stringify({status : "error" , message : error}));            
        }
    }