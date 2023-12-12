import { ComponentService } from "@/services/component.service"
import { ServerMessages } from "../../../../../../constants/messages.constants";

export async function GET(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const componentService = new ComponentService()
        return await componentService.deleteComponent(Number(params.id))
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}