import { prisma } from "@/libs/prisma";
import { ComponentService } from "@/services/component.service";

export async function GET(request: Request) {
  try {
    const data = await prisma.component.findMany({
      include: {
        type: true,
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

export async function POST(req: Request) {
  try {
    const componentService = new ComponentService()
    const body = await req.json()
    return await componentService.createComponent(body)
  } catch (error) {
    console.log(error)
    throw new Error("Internal server error")
  }
}