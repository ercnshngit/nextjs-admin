import { MenuService } from "@/services/menu.service";
import { ServerMessages } from "../../../../../../../constants/messages.constants";

export async function GET(
    req: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const menuService = new MenuService()
        return await menuService.getMenuBySlug(params.slug)
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}