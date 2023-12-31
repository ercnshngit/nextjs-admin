import { TypeService } from "@/services/type.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const typesService = new TypeService(req.nextUrl.pathname);
  try {
    const res = await typesService.getInputDataTypes();
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await typesService.createLog({ error });
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