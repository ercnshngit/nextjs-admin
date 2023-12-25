import { BlockComponentService } from "@/services/block_component.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const blockComponentService = new BlockComponentService(req.nextUrl.pathname);
  try {
    const res = await blockComponentService.getBlockComponents();
    return cors(req, res);
  } catch (error) {
    await blockComponentService.createLog({ error });
    console.log(error);
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}

export async function POST(req: NextRequest) {
  const blockComponentService = new BlockComponentService(req.nextUrl.pathname);
  try {
    const body = await req.json();
    const res = await blockComponentService.createBlockComponent(body);
    return cors(req, res);
  } catch (error) {
    await blockComponentService.createLog({ error });
    console.log(error);
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
