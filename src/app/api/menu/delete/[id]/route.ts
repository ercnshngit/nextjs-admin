import { MenuService } from "@/services/menu.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    const menuService = new MenuService()
    try {
        const res = await menuService.deleteMenu(Number(params.id))
        return cors(req, res);
    } catch (error) {
        console.log(error)
        await menuService.createLog({ error }, req.nextUrl.pathname);
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}