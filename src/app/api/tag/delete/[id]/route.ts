import { TagService } from "@/services/tag.service";
import { ServerMessages } from "../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";

export async function GET(req: Request, { params }: { params: { id: number } }) {
    try {
        const tagService = new TagService();
        const res = await tagService.deleteTag(Number(params.id));
        return cors(req, res);
    } catch (error) {
        console.log(error);
        const logService = new LogService();
        await logService.createLog({ error });
        const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        return cors(req, res);
    }
}
