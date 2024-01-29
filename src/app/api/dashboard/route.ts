import { prisma } from "@/libs/prisma";

import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    const pageCount = await prisma.block.count();
    const blocks = await prisma.block.findMany({
      orderBy: { created_at: "desc" },
      take: 10,
    });
    const res = new Response(
      JSON.stringify({ status: "success", pageCount, blocks }),
      { status: 200 }
    );
    return cors(req, res);
  } catch (error) {
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
