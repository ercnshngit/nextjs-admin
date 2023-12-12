import { prisma } from "@/libs/prisma";

export async function GET(
  request: Request,
  { params }: { params: { table_name: string } }
) {
  try {
    const table_name = params.table_name;
    const data = await prisma.type.findMany({
      where: {
        table: {
          name: table_name,
        },
      },
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error }), {
      status: 400,
    });
  }
}
