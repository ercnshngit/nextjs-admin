import { ComponentPropService } from "@/services/component_prop.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const componentPropService = new ComponentPropService(req.nextUrl.pathname);
  try {
    const res = await componentPropService.getComponentProps();
    return cors(req, res);
  } catch (error) {
    await componentPropService.createLog({ error });
    console.log(error);
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}

export async function POST(req: NextRequest) {
  const componentPropService = new ComponentPropService(req.nextUrl.pathname);
  try {
    const body = await req.json();
    const res = await componentPropService.createComponentProp(body);
    return cors(req, res);
  } catch (error) {
    await componentPropService.createLog({ error });
    console.log(error);
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
