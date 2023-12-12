import { MenuService } from "@/services/menu"
import { ServerMessages } from "../../../../../../constants/messages.constants";

export async function GET(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const menuService = new MenuService()
        return await menuService.getMenu(Number(params.id))
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
        const menuService = new MenuService()
        const body = await req.json()
        return await menuService.updateMenu(Number(params.id), body)
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}