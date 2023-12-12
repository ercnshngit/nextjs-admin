import { prisma } from "@/libs/prisma";

export async function GET(request: Request) {
  try {
    const data = await prisma.data_type.findMany({
      where: {
        type_id: 27,
      },
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error }), {
      status: 400,
    });
  }
}
