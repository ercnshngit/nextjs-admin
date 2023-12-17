import { GeneralService } from "@/services/general.service";
import { ServerMessages } from "../../../../../../../constants/messages.constants";
import cors from "@/utils/cors";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const generalService = new GeneralService();
    const response = await generalService.getGeneralsBySlug(params.slug);
    return cors(req, response);
  } catch (error) {
    console.log(error);
    cors(req, new Response(JSON.stringify(error), { status: 400 }));
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
