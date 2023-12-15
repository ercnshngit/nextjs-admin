import { MenuService } from "@/services/menu.service";
import { ServerMessages } from "../../../../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";

export async function GET(
    req: Request,
    { params }: { params: { type_id: string, slug: string } }
) {
    try {
        const menuService = new MenuService()
        return await menuService.getMenuByTypeAndSlug(Number(params.type_id), params.slug)
    } catch (error) {
        console.log(error)
        const logService = new LogService();
        await logService.createLog({ error });
        throw new Error(ServerMessages[500]);
    }
}