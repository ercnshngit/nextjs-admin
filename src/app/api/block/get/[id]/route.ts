import { BlockService } from "@/services/block.service"
import { LogService } from "@/services/log.service"
import cors from "@/utils/cors"

export async function GET(
    req: Request,
    { params = { id: 0 } }: { params?: { id: number } }
) {
    try {
        const blockService = new BlockService()
        const res = await blockService.getBlock(Number(params.id))
        return cors(req, res);
    } catch (error) {
        console.log(error)
        const logService = new LogService();
        await logService.createLog({ error });
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}

export async function POST(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const blockService = new BlockService()
        const body = await req.json()
        const res = await blockService.updateBlock(Number(params.id), body)
        return cors(req, res);
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error)
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}