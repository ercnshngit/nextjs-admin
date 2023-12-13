import { MenuService } from "@/services/menu"
import { ServerMessages } from "../../../../../../constants/messages.constants";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const menuService = new MenuService()
        return await menuService.getMenusByType(Number(params.id))
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}