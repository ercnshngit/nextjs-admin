import { LogService } from "@/services/log.service";
import { TypeService } from "@/services/type.service";

export async function GET(req: Request) {
    try {
        const typesService = new TypeService();
        return await typesService.getTypesTableNames();
    } catch (error) {
        console.log(error);
        const logService = new LogService();
        await logService.createLog({ error });
        return new Response(JSON.stringify({ status: "error", message: error }), { status: 400 })
    }
}