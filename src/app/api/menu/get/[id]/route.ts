import { MenuService } from "@/services/menu"

export async function GET(
    req: Request,
    { params }: { params: { id: number } }
) {
    try {
        const menuService = new MenuService()
        return await menuService.getMenu(Number(params.id))
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error")
    }
}