import { TagService } from "@/services/tag.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const tagService = new TagService(req.nextUrl.pathname);
  try {
    const res = await tagService.getTag(Number(params.id));
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await tagService.createLog({ error });
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const tagService = new TagService(req.nextUrl.pathname);
  try {
    const body = await req.json();
    const res = await tagService.updateTag(Number(params.id), body);
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await tagService.createLog({ error });
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
