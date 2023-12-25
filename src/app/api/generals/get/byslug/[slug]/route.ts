import { GeneralService } from "@/services/general.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const generalService = new GeneralService(req.nextUrl.pathname);
  try {
    const response = await generalService.getGeneralsBySlug(params.slug);
    return cors(req, response);
  } catch (error) {
    console.log(error);
    await generalService.createLog({ error });
    return cors(req, new Response(JSON.stringify(error), { status: 400 }));
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
