import { MenuService } from "@/services/menu"

export async function GET(
    req: Request,
    { params }: { params: { name: string } }
) {
    try {
        const menuService = new MenuService()
        return await menuService.getMenusByType(params.name)
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error")
    }
}