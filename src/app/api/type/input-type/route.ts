import { prisma } from "@/libs/prisma";
import { LogService } from "@/services/log.service";
import { TypeService } from "@/services/type.service";

export async function GET(request: Request) {
  try {
    const service = new TypeService();
    return await service.getInputDataTypes();
  } catch (error) {
    console.log(error);
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }), {
      status: 400,
    });
  }
}
