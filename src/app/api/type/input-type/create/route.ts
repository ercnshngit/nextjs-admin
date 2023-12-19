import { TypeService } from "@/services/type.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
) {
    const typesService = new TypeService();
    try {
        const res = await typesService.setInputDataTypes()
        return cors(req, res);
    } catch (error) {
        await typesService.createLog({ error }, req.nextUrl.pathname);
        console.log(error)
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}