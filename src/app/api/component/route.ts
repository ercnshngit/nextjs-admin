import { ComponentService } from "@/services/component.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const componentService = new ComponentService(req.nextUrl.pathname);
  try {
    const res = await componentService.getComponents();
    return cors(req, res);
  } catch (error) {
    await componentService.createLog({ error });
    console.log(error);
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}

export async function POST(req: NextRequest) {
  const componentService = new ComponentService(req.nextUrl.pathname)
  try {
    const body = await req.json()
    const res = await componentService.createComponent(body)
    return cors(req, res);
  } catch (error) {
    await componentService.createLog({ error });
    console.log(error)
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
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