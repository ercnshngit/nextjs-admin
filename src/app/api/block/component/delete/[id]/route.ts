import { BlockComponentService } from "@/services/block_component.service"
import cors from "@/utils/cors"
import { NextRequest } from "next/server"

export async function GET(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    const service = new BlockComponentService(req)
    try {
      await service.securiyCheck();
      const res = await service.deleteBlockComponent(Number(params.id))
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