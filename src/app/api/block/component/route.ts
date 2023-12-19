import { BlockComponentService } from "@/services/block_component.service"
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const blockComponentService = new BlockComponentService()
    try {
        const res = await blockComponentService.getBlockComponents()
        return cors(req, res);
    } catch (error) {
        await blockComponentService.createLog({ error }, req.nextUrl.pathname);
        console.log(error)
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}

export async function POST(req: NextRequest) {
    const blockComponentService = new BlockComponentService()
    try {
        const body = await req.json()
        const res = await blockComponentService.createBlockComponent(body)
        return cors(req, res);
    } catch (error) {
        await blockComponentService.createLog({ error }, req.nextUrl.pathname);
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