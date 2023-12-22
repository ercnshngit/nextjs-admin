import { NextRequest } from "next/server";
import { BlockComponentService } from "@/services/block_component.service";
import cors from "@/utils/cors";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const blockComponentService = new BlockComponentService();
  try {
    const res = await blockComponentService.getBlockComponentBySlug(
      params.slug
    );
    if (!res)
      return new Response(
        JSON.stringify({ status: "error", message: "Not found" }),
        { status: 404 }
      );
    return cors(req, res);
  } catch (error) {
    await blockComponentService.createLog({ error }, req.nextUrl.pathname);
    console.log(error);
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const blockComponentService = new BlockComponentService();
  try {
    const body = await req.json();
    const res = await blockComponentService.updateBlockComponent(
      Number(params.id),
      body
    );
    return cors(req, res);
  } catch (error) {
    await blockComponentService.createLog({ error }, req.nextUrl.pathname);
    console.log(error);
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
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
