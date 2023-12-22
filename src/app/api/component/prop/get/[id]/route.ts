import { ComponentPropService } from "@/services/component_prop.service";
import { ServerMessages } from "../../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const componentPropService = new ComponentPropService();
  try {
    const res = await componentPropService.getComponentProp(Number(params.id));
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await componentPropService.createLog({ error }, req.nextUrl.pathname);
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
  const componentPropService = new ComponentPropService();
  try {
    const body = await req.json();
    const res = await componentPropService.updateComponentProp(
      Number(params.id),
      body
    );
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await componentPropService.createLog({ error }, req.nextUrl.pathname);
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
