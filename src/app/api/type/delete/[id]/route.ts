import { TypesService } from "@/services/types.service";
import { ServerMessages } from "../../../../../../constants/messages.constants";

export async function GET(req: Request, { params }: { params: { id: number } }) {
    try {
        const typesService = new TypesService();
        return await typesService.deleteType(Number(params.id));
    } catch (error) {
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}
