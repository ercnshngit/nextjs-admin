import { PropService } from "@/services/prop.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const propService = new PropService(req.nextUrl.pathname);
  try {
    const res = await propService.deleteProp(Number(params.id));
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
