import { prisma } from "@/libs/prisma";
import { BlockService } from "@/services/block.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  const tableService = new BlockService(request.nextUrl.pathname);
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
    const response = new Response(JSON.stringify(block));
    return cors(request, response);
  } catch (error) {
    await tableService.createLog({ error });
    const response = new Response(JSON.stringify({ status: "error", message: error }), {
      status: 500,
    });
    return cors(request, response);
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
