import { TypeService } from "@/services/type.service"
import { ServerMessages } from "../../../../../../constants/messages.constants";

export async function GET(
    req: Request,
) {
    const service = new TypeService();
    try {
        return await service.setRelationTypes()
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500]);
    }
}