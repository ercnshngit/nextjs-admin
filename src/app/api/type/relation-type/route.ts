import { prisma } from "@/libs/prisma";
import { TypeService } from "@/services/type.service";

export async function GET(request: Request) {
  try {
    const service = new TypeService();
    return await service.getRelationTypes();
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ status: "error", message: error }), {
      status: 400,
    });
  }
}
