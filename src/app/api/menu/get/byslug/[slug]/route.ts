import { MenuService } from "@/services/menu.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const menuService = new MenuService(req.nextUrl.pathname);
  try {
    const res = await menuService.getMenuBySlug(params.slug);
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
