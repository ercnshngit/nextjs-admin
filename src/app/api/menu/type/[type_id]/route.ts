import { MenuService } from "@/services/menu.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { type_id: string; id: number } }
) {
  const service = new MenuService(req);
  try {
    await service.securiyCheck();
    const res = await service.getMenusByType(Number(params.type_id));
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
