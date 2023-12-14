import { BlockComponentService } from "@/services/block_component.service"
import { LogService } from "@/services/log.service";

export async function GET(req: Request) {
    try {
        const blockComponentService = new BlockComponentService()
        return await blockComponentService.getBlockComponents()
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error)
        return new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const blockComponentService = new BlockComponentService()
        const body = await req.json()
        return await blockComponentService.createBlockComponent(body)
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error)
        return new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    }
}