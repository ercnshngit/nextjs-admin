import { MenuService } from "@/services/menu.service";
import { ServerMessages } from "../../../../constants/messages.constants";

export async function GET(
    req: Request
) {
    try {
        const menuService = new MenuService()
        return await menuService.getMenus()
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}

export async function POST(
    req: Request
) {
    try {
        const menuService = new MenuService()
        const body = await req.json()
        return await menuService.createMenu(body)
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}