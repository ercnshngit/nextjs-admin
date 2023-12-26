import { BlockComponentPropService } from "@/services/block_component_prop.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const blockComponentPropService = new BlockComponentPropService(req.nextUrl.pathname);
  try {
    const res = await blockComponentPropService.deleteBlockComponentProp(
      Number(params.id)
    );
    return cors(req, res);
  } catch (error) {
    await blockComponentPropService.createLog({ error });
    console.log(error);
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
