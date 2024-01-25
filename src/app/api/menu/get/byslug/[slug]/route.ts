import { MenuService } from "@/services/menu.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const service = new MenuService(req);
  try {
    await service.securiyCheck();
    const res = await service.getMenuBySlug(params.slug);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
