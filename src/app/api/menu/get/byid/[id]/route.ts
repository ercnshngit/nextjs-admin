import { MenuService } from "@/services/menu.service";
import { ServerMessages } from "../../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";

export async function GET(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const menuService = new MenuService()
        return await menuService.getMenuById(Number(params.id))
    } catch (error) {
        console.log(error)
        const logService = new LogService();
        await logService.createLog({ error });
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
        const logService = new LogService();
        await logService.createLog({ error });
        throw new Error(ServerMessages[500]);
    }
}