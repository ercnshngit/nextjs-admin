import { BlockService } from "@/services/block.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    const blockService = new BlockService()
    try {
        const res = await blockService.deleteBlock(Number(params.id))
        return cors(req, res);
    } catch (error) {
        await blockService.createLog({ error }, req.nextUrl.pathname);
        console.log(error)
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}