import { BlockService } from "@/services/block.service"

export async function GET(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const blockService = new BlockService()
        return await blockService.deleteBlock(Number(params.id))
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error")
    }
}