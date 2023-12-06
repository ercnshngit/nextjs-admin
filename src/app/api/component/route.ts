import { prisma } from "@/libs/prisma";

export async function GET(request: Request) {
  try {
    const data = await prisma.component.findMany({
      include: {
        types: true,
        tag: true,
        component_prop: {
          include: {
            prop: true,
          },
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
