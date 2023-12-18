import { ComponentPropService } from "@/services/component_prop.service";
import { ServerMessages } from "../../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
    try {
        const componentPropService = new ComponentPropService();
        const res = await componentPropService.deleteComponentProp(Number(params.id));
        return cors(req, res);
    } catch (error) {
        console.log(error);
        const logService = new LogService();
        await logService.createLog({ error });
        const res = new Response(JSON.stringify({ status: "error", message: error }),{status: 500});
        return cors(req, res);
    }
}