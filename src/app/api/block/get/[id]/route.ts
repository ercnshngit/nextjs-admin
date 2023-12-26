import { BlockService } from "@/services/block.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params = { id: 0 } }: { params?: { id: number } }
) {
  const blockService = new BlockService(req.nextUrl.pathname);
  try {
    const res = await blockService.getBlock(Number(params.id));
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await blockService.createLog({ error });
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
  const blockService = new BlockService(req.nextUrl.pathname);
  try {
    const body = await req.json();
    const res = await blockService.updateBlock(Number(params.id), body);
    return cors(req, res);
  } catch (error) {
    await blockService.createLog({ error });
    console.log(error);
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
