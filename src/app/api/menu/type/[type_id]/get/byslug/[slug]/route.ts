import { MenuService } from "@/services/menu.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { type_id: string; slug: string } }
) {
  const menuService = new MenuService();
  try {
    const res = await menuService.getMenuByTypeAndSlug(
      Number(params.type_id),
      params.slug
    );
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await menuService.createLog({ error }, req.nextUrl.pathname);
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
