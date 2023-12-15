import { BlockComponentPropService } from "@/services/block_component_prop.service";
import { ServerMessages } from "../../../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
    try {
        const blockComponentPropService = new BlockComponentPropService();
        return await blockComponentPropService.deleteBlockComponentProp(Number(params.id));
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}