import { ComponentService } from "@/services/component.service"
import { ServerMessages } from "../../../../../../constants/messages.constants"
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";

export async function GET(
    req: Request,
    { params = { id: 0 } }: { params?: { id: number } }
) {
    try {
        const componentService = new ComponentService()
        const res = await componentService.getComponent(Number(params.id))
        return cors(req, res);
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error)
        const res = new Response(JSON.stringify({ status: "error", message: error }),{status: 500});
        return cors(req, res);
    }
}

export async function POST(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const componentService = new ComponentService()
        const body = await req.json()
        const res = await componentService.updateComponent(Number(params.id), body)
        return cors(req, res);
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error)
        const res = new Response(JSON.stringify({ status: "error", message: error }),{status: 500});
        return cors(req, res);
    }
}