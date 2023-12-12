import { ComponentService } from "@/services/component.service"
import { ServerMessages } from "../../../../../../constants/messages.constants"

export async function GET(
    req: Request,
    { params = { id: 0 } }: { params?: { id: number } }
) {
    try {
        const componentService = new ComponentService()
        return await componentService.getComponent(Number(params.id))
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}

export async function POST(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const componentService = new ComponentService()
        const body = await req.json()
        return await componentService.updateComponent(Number(params.id), body)
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}