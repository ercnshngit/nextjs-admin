import { BlockComponentService } from "@/services/block_component.service"

export async function GET(req: Request, { params }: { params: { id: number } }) {
    try {
        const blockComponentService = new BlockComponentService()
        return await blockComponentService.getBlockComponents()
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error")
    }
}

export async function POST(req: Request) {
    try {
        const blockComponentService = new BlockComponentService()
        const body = await req.json()
        return await blockComponentService.createBlockComponent(body)
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error")
    }
}