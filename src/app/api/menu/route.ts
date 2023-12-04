import { MenuService } from "@/services/menu"

export async function GET(
    req: Request
) {
    try {
        const menuService = new MenuService()
        return await menuService.getMenus()
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error")
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
        throw new Error("Internal server error")
    }
}