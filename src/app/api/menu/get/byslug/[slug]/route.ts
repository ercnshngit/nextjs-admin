import { MenuService } from "@/services/menu.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { typeId: number } }
) {
  const service = new MenuService(req);
  try {
    await service.securiyCheck();
    const res = await service.getMenuByTypeId(params.typeId);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
