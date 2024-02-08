import { PropService } from "@/services/prop.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const service = new PropService(req);
  try {
    await service.securiyCheck();
    const res = await service.getProps();
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export async function POST(req: NextRequest) {
  const service = new PropService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.createProp(body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
