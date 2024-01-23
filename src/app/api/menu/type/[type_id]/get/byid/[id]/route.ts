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
    const res = await service.getMenuByTypeAndId(
      Number(params.type_id),
      Number(params.id)
    );
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
