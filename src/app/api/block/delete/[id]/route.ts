import { BlockService } from "@/services/block.service"
import { ServerMessages } from "../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";

export async function GET(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const blockService = new BlockService()
        return await blockService.deleteBlock(Number(params.id))
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}