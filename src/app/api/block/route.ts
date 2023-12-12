import { BlockService } from "@/services/block.service"
import { ServerMessages } from "../../../../constants/messages.constants";

export async function GET(req: Request) {
    try {
        const blockService = new BlockService()
        return await blockService.getBlocks()
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}

export async function POST(req: Request) {
    try {
        const blockService = new BlockService()
        const body = await req.json()
        return await blockService.createBlock(body)
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}