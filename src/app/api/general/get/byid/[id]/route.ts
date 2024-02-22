import { GeneralService } from "@/services/general.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const service = new GeneralService(req);
  try {
    await service.securiyCheck();
    const response = await service.getGeneralById(Number(params.id));
    return cors(req, response);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const service = new GeneralService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    return await service.updateGeneral(Number(params.id), body);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
