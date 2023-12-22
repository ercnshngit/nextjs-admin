import { ComponentService } from "@/services/component.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const componentService = new ComponentService();
  try {
    const res = await componentService.deleteComponent(Number(params.id));
    return cors(req, res);
  } catch (error) {
    await componentService.createLog({ error }, req.nextUrl.pathname);
    console.log(error);
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
