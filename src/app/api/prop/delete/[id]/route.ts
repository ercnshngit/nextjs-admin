import { PropService } from "@/services/prop.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const service = new PropService(req);
  try {
    await service.securiyCheck();
    const res = await service.deleteProp(Number(params.id));
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
