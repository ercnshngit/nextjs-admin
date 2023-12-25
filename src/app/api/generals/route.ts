import { GeneralService } from "@/services/general.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const generalService = new GeneralService(req.nextUrl.pathname);
  try {
    const res = await generalService.getGenerals();
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

export async function POST(req: NextRequest) {
  const generalService = new GeneralService(req.nextUrl.pathname);
  try {
    const body = await req.json();
    const res = await generalService.createGeneral(body);
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
