import { BlockService } from "@/services/block.service"
import { BlockComponentService } from "@/services/block_component.service"
import { NextRequest } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const blockComponentService = new BlockComponentService()
        const body = await req.json()
        return await blockComponentService.updateBlockComponent(Number(params.id), body)
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error")
    }
}