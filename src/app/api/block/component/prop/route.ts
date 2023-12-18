import { BlockComponentPropService } from "@/services/block_component_prop.service";
import { ServerMessages } from "../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";


export async function GET(req: Request) {
    try {
        const blockComponentPropService = new BlockComponentPropService();
        const res = await blockComponentPropService.getBlockComponentProps();
        return cors(req, res);
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error);
        const res = new Response(JSON.stringify({ status: "error", message: error }),{status: 500}); 
        return cors(req, res);
    }
}

export async function POST(req: Request) {
    try {
        const blockComponentPropService = new BlockComponentPropService();
        const body = await req.json();
        const res = await blockComponentPropService.createBlockComponentProp(body);
        return cors(req, res);
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error);
        const res = new Response(JSON.stringify({ status: "error", message: error }),{status: 500}); 
        return cors(req, res);
    }
}
