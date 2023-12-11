import { BlockComponentService } from "@/services/block_component.service"

export async function GET(req: Request) {
    try {
        const blockComponentService = new BlockComponentService()
        return await blockComponentService.getBlockComponents()
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({status : "error" , message : error}), {status : 500});        
    }
}

export async function POST(req: Request) {
    try {
        const blockComponentService = new BlockComponentService()
        const body = await req.json()
        return await blockComponentService.createBlockComponent(body)
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({status : "error" , message : error}), {status : 500});        
    }
}