import { TypeService } from "@/services/type.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const service = new TypeService(req);
  try {
    await service.securiyCheck();
    const res = await service.setInputDataTypes();
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
