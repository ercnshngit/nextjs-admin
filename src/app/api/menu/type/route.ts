import { MenuService } from "@/services/menu"
import { ServerMessages } from "../../../../../constants/messages.constants";

export async function GET(
    req: Request
) {
    try {
        const menuService = new MenuService()
        return await menuService.getMenusByType()
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}