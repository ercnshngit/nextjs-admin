import { BlockService } from "@/services/block.service"
import { BlockComponentService } from "@/services/block_component.service"
import { ServerMessages } from "../../../../../../../constants/messages.constants"
import { LogService } from "@/services/log.service"

export async function GET(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const blockComponentService = new BlockComponentService()
        return await blockComponentService.getBlockComponent(Number(params.id))
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}

export async function POST(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const blockComponentService = new BlockComponentService()
        const body = await req.json()
        return await blockComponentService.updateBlockComponent(Number(params.id), body)
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}