import { BlockService } from "@/services/block.service"
import { BlockComponentService } from "@/services/block_component.service"

export async function GET(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const blockComponentService = new BlockComponentService()
        return await blockComponentService.getBlockComponent(Number(params.id))
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error")
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
        console.log(error)
        throw new Error("Internal server error")
    }
}