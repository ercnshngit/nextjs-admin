import { GeneralService } from "@/services/general.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const generalService = new GeneralService(req.nextUrl.pathname);
  try {
    const response = await generalService.getGeneralById(Number(params.id));

    return cors(req, response);
  } catch (error) {
    console.log(error);
    await generalService.createLog({ error });
    return cors(req, new Response(JSON.stringify(error), { status: 400 }));
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const generalService = new GeneralService(req.nextUrl.pathname);
  try {
    const body = await req.json();
    return await generalService.updateGeneral(Number(params.id), body);
  } catch (error) {
    console.log(error);
    await generalService.createLog({ error });
    return cors(
      req,
      new Response(null, {
        status: 204,
      })
    );
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
