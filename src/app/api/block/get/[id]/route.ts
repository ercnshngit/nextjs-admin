import { BlockService } from "@/services/block.service"

export async function GET(
    { params }: { params: { id: number } }
) {
    try {
        const blockService = new BlockService()
        return await blockService.getBlock(Number(params.id))
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error")
    }
}