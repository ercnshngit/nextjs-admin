import { ComponentPropService } from "@/services/component_prop.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const service = new ComponentPropService(req);
  try {
    const res = await service.getComponentProp(Number(params.id));
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const service = new ComponentPropService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.updateComponentProp(Number(params.id), body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
