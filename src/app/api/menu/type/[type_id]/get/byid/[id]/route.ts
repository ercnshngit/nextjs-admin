import { MenuService } from "@/services/menu.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { type_id: string; id: number } }
) {
  const menuService = new MenuService(req.nextUrl.pathname);
  try {
    const res = await menuService.getMenuByTypeAndId(
      Number(params.type_id),
      Number(params.id)
    );
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await menuService.createLog({ error });
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
