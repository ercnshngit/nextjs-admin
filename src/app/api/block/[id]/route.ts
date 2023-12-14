import { prisma } from "@/libs/prisma";
import { BlockService } from "@/services/block.service";
import { LogService } from "@/services/log.service";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  const tableService = new BlockService();
  try {
    const block = await prisma.block.findUnique({
      select: {
        id: true,
        title: true,
        type_id: true,
      },
      where: {
        id: +id,
      },
    });
    console.log(block);
    return new Response(JSON.stringify(block));
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    return new Response(JSON.stringify({ status: "error", message: error }), {
      status: 500,
    });
  }
}
