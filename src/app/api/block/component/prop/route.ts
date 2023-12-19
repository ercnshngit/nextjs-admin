import { BlockComponentPropService } from "@/services/block_component_prop.service";
import { ServerMessages } from "../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const blockComponentPropService = new BlockComponentPropService();
    try {
        const res = await blockComponentPropService.getBlockComponentProps();
        return cors(req, res);
    } catch (error) {
        await blockComponentPropService.createLog({ error }, req.nextUrl.pathname);
        console.log(error);
        const res = new Response(JSON.stringify({ status: "error", message: error }),{status: 500}); 
        return cors(req, res);
    }
}

export async function POST(req: NextRequest) {
    const blockComponentPropService = new BlockComponentPropService();
    try {
        const body = await req.json();
        const res = await blockComponentPropService.createBlockComponentProp(body);
        return cors(req, res);
    } catch (error) {
        await blockComponentPropService.createLog({ error }, req.nextUrl.pathname);
        console.log(error);
        const res = new Response(JSON.stringify({ status: "error", message: error }),{status: 500}); 
        return cors(req, res);
    }
}
