import { TypeService } from "@/services/type.service"
import { ServerMessages } from "../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";

export async function GET(
    req: Request,
) {
    const service = new TypeService();
    try {
        return await service.setInputDataTypes()
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}