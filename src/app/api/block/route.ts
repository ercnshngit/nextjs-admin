import { BlockService } from "@/services/block.service";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const blockService = new BlockService()
    try {
        const res = await blockService.getBlocks()
        return cors(req, res);
    } catch (error) {
        console.log(error)
        await blockService.createLog({ error }, req.nextUrl.pathname);
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}

export async function POST(req: NextRequest) {
    const blockService = new BlockService()
    try {
        const body = await req.json()
        const res = await blockService.createBlock(body)
        return cors(req, res);
    } catch (error) {
        await blockService.createLog({ error }, req.nextUrl.pathname);
        console.log(error)
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}

export async function OPTIONS(request: Request) { 
    return cors(
      request,
      new Response(null, {
        status: 204,
      })
    );
}