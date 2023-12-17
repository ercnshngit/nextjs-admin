import { GeneralService } from "@/services/general.service";
import { ServerMessages } from "../../../../../../../constants/messages.constants";
import cors from "@/utils/cors";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const generalService = new GeneralService();
    const response = await generalService.getGeneralById(Number(params.id));

    return cors(req, response);
  } catch (error) {
    console.log(error);
    throw new Error(ServerMessages[500]);
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const generalService = new GeneralService();
    const body = await req.json();
    return await generalService.updateGeneral(Number(params.id), body);
  } catch (error) {
    console.log(error);
    throw new Error(ServerMessages[500]);
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
