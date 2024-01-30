import { ComponentService } from "@/services/component.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const service = new ComponentService(req);
  try {
    await service.securiyCheck();
    const res = await service.deleteComponent(Number(params.id));
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
