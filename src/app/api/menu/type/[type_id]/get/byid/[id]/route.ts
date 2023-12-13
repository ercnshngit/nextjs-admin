import { MenuService } from "@/services/menu.service";
import { ServerMessages } from "../../../../../../../../../constants/messages.constants";

export async function GET(
    req: Request,
    { params }: { params: { type_id: string, id: number } }
) {
    try {
        const menuService = new MenuService()
        return await menuService.getMenuByTypeAndId(Number(params.type_id), Number(params.id))
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}