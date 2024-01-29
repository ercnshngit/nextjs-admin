import { BlockComponentService } from "@/services/block_component.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const service = new BlockComponentService(req);
  try {
    await service.securiyCheck();
    const res = await service.getBlockComponent(Number(params.id));
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const service = new BlockComponentService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.updateBlockComponent(Number(params.id), body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export async function OPTIONS(request: Request) {
  return cors(
    request,
    new Response(null, {
      status: 204,
    })
  );
}
