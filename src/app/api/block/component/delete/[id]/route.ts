import { BlockComponentService } from "@/services/block_component.service"
import cors from "@/utils/cors"
import { NextRequest } from "next/server"

export async function GET(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    const blockComponentService = new BlockComponentService(req.nextUrl.pathname)
    try {
        const res = await blockComponentService.deleteBlockComponent(Number(params.id))
        return cors(req, res);
    } catch (error) {
        await blockComponentService.createLog({ error });
        console.log(error)
        const res = new Response(JSON.stringify({ status: "error", message: error }),{status: 500}); 
        return cors(req, res);
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