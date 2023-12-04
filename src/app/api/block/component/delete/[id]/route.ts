import { BlockService } from "@/services/block.service"
import { BlockComponentService } from "@/services/block_component.service"

export async function GET(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const blockComponentService = new BlockComponentService()
        return await blockComponentService.deleteBlockComponent(Number(params.id))
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error")
    }
}