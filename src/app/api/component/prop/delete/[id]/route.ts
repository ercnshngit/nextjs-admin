import { ComponentPropService } from "@/services/component_prop.service";
import { ServerMessages } from "../../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
    try {
        const componentPropService = new ComponentPropService();
        return await componentPropService.deleteComponentProp(Number(params.id));
    } catch (error) {
        console.log(error);
        const logService = new LogService();
        await logService.createLog({ error });
        throw new Error(ServerMessages[500]);
    }
}