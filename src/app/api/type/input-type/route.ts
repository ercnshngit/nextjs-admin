import { prisma } from "@/libs/prisma";
import { LogService } from "@/services/log.service";
import { TypeService } from "@/services/type.service";
import cors from "@/utils/cors";

export async function GET(req: Request) {
  try {
    const service = new TypeService();
    const res = await service.getInputDataTypes();
    return cors(req, res);
  } catch (error) {
    console.log(error);
    const logService = new LogService();
    await logService.createLog({ error });
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}
