import { TypeService } from "@/services/types.service";
import { ServerMessages } from "../../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
    const typesService = new TypeService();
    try {
        const res = await typesService.getType(Number(params.id));
        return cors(req, res);
    } catch (error) {
        console.log(error);
        await typesService.createLog({ error }, req.nextUrl.pathname);
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}

export async function POST(req: NextRequest, { params }: { params: { id: number } }) {
    const typesService = new TypeService();
    try {
        const body = await req.json();
        const res = await typesService.updateType(Number(params.id), body);
        return cors(req, res);
    } catch (error) {
        console.log(error);
        await typesService.createLog({ error }, req.nextUrl.pathname);
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}
