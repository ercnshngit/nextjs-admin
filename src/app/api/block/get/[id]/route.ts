import { BlockService } from "@/services/block.service"
import { NextRequest } from "next/server"
import { ServerMessages } from "../../../../../../constants/messages.constants"

export async function GET(
    req: Request,
    { params = { id: 0 } }: { params?: { id: number } }
) {
    try {
        const blockService = new BlockService()
        return await blockService.getBlock(Number(params.id))
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}

export async function POST(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const blockService = new BlockService()
        const body = await req.json()
        return await blockService.updateBlock(Number(params.id), body)
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}