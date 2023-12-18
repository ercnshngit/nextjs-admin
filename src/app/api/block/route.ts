import { BlockService } from "@/services/block.service";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";

export async function GET(req: Request) {
    try {
        const blockService = new BlockService()
        const res = await blockService.getBlocks()
        return cors(req, res);
    } catch (error) {
        console.log(error)
        const logService = new LogService();
        await logService.createLog({ error });
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}

export async function POST(req: Request) {
    try {
        const blockService = new BlockService()
        const body = await req.json()
        const res = await blockService.createBlock(body)
        return cors(req, res);
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error)
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}