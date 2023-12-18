import { LogService } from "@/services/log.service";
import { TypeService } from "@/services/type.service";
import cors from "@/utils/cors";

export async function GET(
    req: Request,
) {
    const service = new TypeService();
    try {
        const res = await service.setRelationTypes()
        return cors(req, res);
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error)
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}