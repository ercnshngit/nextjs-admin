import { BlockService } from "@/services/block.service"
import { BlockDto } from "@/services/dto/block.dto"

export async function GET(
) {
    try {
        const blockService = new BlockService()
        return await blockService.getBlocks()
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error")
    }
}

export async function POST(
    req: Request
) {
    try {
        const blockService = new BlockService()
        const body = await req.json()
        return await blockService.createBlock(body)
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error")
    }
}