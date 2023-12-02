import { BlockService } from "@/services/block.service"
import { ComponentService } from "@/services/component.service"

export async function GET(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const componentService = new ComponentService()
        return await componentService.getBlockComponent(Number(params.id))
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