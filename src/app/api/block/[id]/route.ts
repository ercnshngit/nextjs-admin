import { prisma } from "@/libs/prisma";
import { BlockService } from "@/services/block.service";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  const tableService = new BlockService();
  try {
    const block = await prisma.block.findUnique({ where: { id } });
    return new Response(JSON.stringify(block));
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error }), {
      status: 500,
    });
  }
}
