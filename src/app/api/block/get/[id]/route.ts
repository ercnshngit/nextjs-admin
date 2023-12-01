import { BlockService } from "@/services/block.service"
import { NextRequest } from "next/server"

export async function GET(
    req: Request,
    { params = { id: 0 } }: { params?: { id: number } }
) {
    try {
        const blockService = new BlockService()
        return await blockService.getBlock(Number(params.id))
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error")
    }
}