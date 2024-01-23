import { BlockService } from "@/services/block.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  const service = new BlockService(request);
  try {
    await service.securiyCheck();
    const response = await service.getBlock(id);
    return cors(request, response);
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
