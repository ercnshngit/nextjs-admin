import { LogService } from "@/services/log.service";
import { TypeService } from "@/services/type.service";
import cors from "@/utils/cors";

export async function GET(req: Request, { params }: { params: { table_name: string } }) {
    try {
        const table_name = params.table_name;
        const typesService = new TypeService();
        const res = await typesService.getTypeWithTableName(table_name);
        return cors(req, res);
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error);
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}