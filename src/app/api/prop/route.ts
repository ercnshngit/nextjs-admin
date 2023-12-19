import { PropService } from "@/services/prop.service";
import { ServerMessages } from "../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";

export async function GET(req: Request) {
    try {
        const propService = new PropService();
        const res = await propService.getProps();
        return cors(req, res);
    } catch (error) {
        console.log(error);
        const logService = new LogService();
        await logService.createLog({ error });
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}

export async function POST(req: Request) {
    try {
        const propService = new PropService();
        const body = await req.json();
        const res = await propService.createProp(body);
        return cors(req, res);
    } catch (error) {
        console.log(error);
        const logService = new LogService();
        await logService.createLog({ error });
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}
