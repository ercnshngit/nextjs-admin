import { prisma } from "@/libs/prisma";

export async function GET(request: Request) {
  try {
    const data = await prisma.type.findMany({
      where: {
        table_id: 1,
      },
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error }), {
      status: 400,
    });
  }
}