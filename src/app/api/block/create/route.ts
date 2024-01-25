import { BlockService } from "@/services/block.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const service = new BlockService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.createBlockWithComponents(body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
