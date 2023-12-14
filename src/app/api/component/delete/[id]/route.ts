import { ComponentService } from "@/services/component.service"
import { ServerMessages } from "../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";

export async function GET(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const componentService = new ComponentService()
        return await componentService.deleteComponent(Number(params.id))
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}