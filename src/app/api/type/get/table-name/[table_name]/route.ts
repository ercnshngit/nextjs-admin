import { LogService } from "@/services/log.service";
import { TypeService } from "@/services/type.service";

export async function GET(req: Request, { params }: { params: { table_name: string } }) {
    try {
        const table_name = params.table_name;
        const typesService = new TypeService();
        return await typesService.getTypeWithTableName(table_name);
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error);
        return new Response(JSON.stringify({ status: "error", message: error }), { status: 400 })
    }
}