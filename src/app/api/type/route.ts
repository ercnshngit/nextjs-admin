import { TypeService } from "@/services/types.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const service = new TypeService(req);
  try {
    await service.securiyCheck();
    const res = await service.getTypes();
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export async function POST(req: NextRequest) {
  const service = new TypeService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.createType(body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
