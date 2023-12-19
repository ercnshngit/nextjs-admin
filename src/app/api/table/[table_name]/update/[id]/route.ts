import { TableService } from "@/services/table.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: { table_name: string, id: number } }
) {
    const table_name = params.table_name
    const id = params.id
    const tableService = new TableService()
    try {
        const body = await req.json()
        const res =  await tableService.updateTableWithId(table_name, id, body)
        return cors(req, res);
    } catch (error) {
        console.log(error);
        await tableService.createLog({ error }, req.nextUrl.pathname);
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}