import { BlockComponentService } from "@/services/block_component.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const service = new BlockComponentService(req);
  try {
    await service.securiyCheck();
    const res = await service.getBlockComponents();
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export async function POST(req: NextRequest) {
  const service = new BlockComponentService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.createBlockComponent(body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
