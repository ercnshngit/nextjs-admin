import { TypesService } from "@/services/types.service"
import { ServerMessages } from "../../../../constants/messages.constants"

export async function GET(req: Request) {
    try {
        const typesService = new TypesService()
        return await typesService.getTypes()
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500])
    }
}

export async function POST(req: Request) {
    try {
        const typesService = new TypesService()
        const body = await req.json()
        return await typesService.createType(body)
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500])
    }
}