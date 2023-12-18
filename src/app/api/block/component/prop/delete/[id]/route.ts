import { BlockComponentPropService } from "@/services/block_component_prop.service";
import { ServerMessages } from "../../../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
    try {
        const blockComponentPropService = new BlockComponentPropService();
        const res = await blockComponentPropService.deleteBlockComponentProp(Number(params.id));
        return cors(req, res);
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error);
        const res = new Response(JSON.stringify({ status: "error", message: error }),{status: 500}); 
        return cors(req, res);
    }
}