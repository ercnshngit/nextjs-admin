import { TagService } from "@/services/tag.service"
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const tagService = new TagService()
    try {
        const res = await tagService.getTags()
        return cors(req, res);
    } catch (error) {
        console.log(error)
        await tagService.createLog({ error }, req.nextUrl.pathname);
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}

export async function POST(req: NextRequest) {
    const tagService = new TagService()
    try {
        const body = await req.json()
        const res = await tagService.createTag(body)
        return cors(req, res);
    } catch (error) {
        console.log(error)
        await tagService.createLog({ error }, req.nextUrl.pathname);
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
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