import { TagService } from "@/services/tag.service"
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";

export async function GET(req: Request) {
    try {
        const tagService = new TagService()
        const res = await tagService.getTags()
        return cors(req, res);
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error)
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}

export async function POST(req: Request) {
    try {
        const tagService = new TagService()
        const body = await req.json()
        const res = await tagService.createTag(body)
        return cors(req, res);
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error)
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}