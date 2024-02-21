import { BlockComponentService } from "@/services/block_component.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { type: string } }
) {
  const service = new BlockComponentService(req);
  try {
    await service.securiyCheck();
    const res = await service.getBlockComponentsByType(params.type);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
