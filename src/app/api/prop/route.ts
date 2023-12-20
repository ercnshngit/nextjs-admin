import { PropService } from "@/services/prop.service";
import { ServerMessages } from "../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const propService = new PropService();
    try {
        const res = await propService.getProps();
        return cors(req, res);
    } catch (error) {
        console.log(error);
        await propService.createLog({ error }, req.nextUrl.pathname);
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}

export async function POST(req: NextRequest) {
    const propService = new PropService();
    try {
        const body = await req.json();
        const res = await propService.createProp(body);
        return cors(req, res);
    } catch (error) {
        console.log(error);
        await propService.createLog({ error }, req.nextUrl.pathname);
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