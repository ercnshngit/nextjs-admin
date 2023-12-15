import { TypeService } from "@/services/types.service"
import { ServerMessages } from "../../../../constants/messages.constants"
import { LogService } from "@/services/log.service"

export async function GET(req: Request) {
    try {
        const typesService = new TypeService()
        return await typesService.getTypes()
    } catch (error) {
        console.log(error)
        const logService = new LogService();
        await logService.createLog({ error });
        throw new Error(ServerMessages[500])
    }
}

export async function POST(req: Request) {
    try {
        const typesService = new TypeService()
        const body = await req.json()
        return await typesService.createType(body)
    } catch (error) {
        console.log(error)
        const logService = new LogService();
        await logService.createLog({ error });
        throw new Error(ServerMessages[500])
    }
}