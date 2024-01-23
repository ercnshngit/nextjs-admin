import { ComponentService } from "@/services/component.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params = { id: 0 } }: { params?: { id: number } }
) {
  const service = new ComponentService(req);
  try {
    await service.securiyCheck();
    const res = await service.getComponent(Number(params.id));
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const service = new ComponentService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.updateComponent(Number(params.id), body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
