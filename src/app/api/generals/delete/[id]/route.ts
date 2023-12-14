import { GeneralService } from "@/services/general.service";
import { ServerMessages } from "../../../../../../constants/messages.constants";

export async function GET(req: Request, { params }: { params: { id: number } }) {
    try {
        const generalService = new GeneralService();
        return await generalService.deleteGeneral(Number(params.id));
    } catch (error) {
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}