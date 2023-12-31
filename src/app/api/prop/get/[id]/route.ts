import { PropService } from "@/services/prop.service";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const propService = new PropService(req.nextUrl.pathname);
  try {
    const res = await propService.getProp(Number(params.id));
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await propService.createLog({ error });
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
  const propService = new PropService(req.nextUrl.pathname);
  try {
    const body = await req.json();
    const res = await propService.updateProp(Number(params.id), body);
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await propService.createLog({ error });
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
