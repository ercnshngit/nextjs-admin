import { BlockService } from "@/services/block.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const service = new BlockService(req);
  try {
    await service.securiyCheck();
    const res = await service.getBlocks();
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export async function POST(req: NextRequest) {
  const service = new BlockService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.createBlock(body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
