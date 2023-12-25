import { ComponentPropService } from "@/services/component_prop.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const componentPropService = new ComponentPropService(req.nextUrl.pathname);
  try {
    const res = await componentPropService.deleteComponentProp(
      Number(params.id)
    );
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await componentPropService.createLog({ error });
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
