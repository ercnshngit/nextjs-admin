import { NextRequest } from "next/server";
import { BlockComponentService } from "@/services/block_component.service";
import cors from "@/utils/cors";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const service = new BlockComponentService(req.nextUrl.pathname);
  try {
    await service.securiyCheck();
    const res = await service.getBlockComponentBySlug(
      params.slug
    );
    if (!res)
      return new Response(
        JSON.stringify({ status: "error", message: "Not found" }),
        { status: 404 }
      );
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
    const res = await service.updateBlockComponent(
      Number(params.id),
      body
    );
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
