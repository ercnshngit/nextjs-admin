import { TypeService } from "@/services/types.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
    const typesService = new TypeService();
    try {
        const res = await typesService.deleteType(Number(params.id));
        return cors(req, res);
    } catch (error) {
        console.log(error);
        await typesService.createLog({ error }, req.nextUrl.pathname);
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}
