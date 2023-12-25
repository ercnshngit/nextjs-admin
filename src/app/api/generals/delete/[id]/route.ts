import { GeneralService } from "@/services/general.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const generalService = new GeneralService(req.nextUrl.pathname);
  try {
    const res = await generalService.deleteGeneral(Number(params.id));
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await generalService.createLog({ error });
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
