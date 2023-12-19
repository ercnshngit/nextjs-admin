import { BlockComponentService } from "@/services/block_component.service"
import { LogService } from "@/services/log.service"
import cors from "@/utils/cors"
import { NextRequest } from "next/server"

export async function GET(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    const blockComponentService = new BlockComponentService()
    try {
        const res = await blockComponentService.getBlockComponent(Number(params.id))
        return cors(req, res);
    } catch (error) {
        await blockComponentService.createLog({ error }, req.nextUrl.pathname);
        console.log(error)
        const res = new Response(JSON.stringify({ status: "error", message: error }),{status: 500}); 
        return cors(req, res);
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    const blockComponentService = new BlockComponentService()
    try {
        const body = await req.json()
        const res = await blockComponentService.updateBlockComponent(Number(params.id), body)
        return cors(req, res);
    } catch (error) {
        await blockComponentService.createLog({ error }, req.nextUrl.pathname);
        console.log(error)
        const res = new Response(JSON.stringify({ status: "error", message: error }),{status: 500}); 
        return cors(req, res);
    }
}