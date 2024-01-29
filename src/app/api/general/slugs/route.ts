import { GeneralService } from "@/services/general.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const generalService = new GeneralService(req);
  try {
    const res = await generalService.getGeneralSlugs();
    return cors(req, res);
  } catch (error) {
    await generalService.createLog({ error });
    console.log(error);
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
