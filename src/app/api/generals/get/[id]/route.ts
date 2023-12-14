import { GeneralService } from "@/services/general.service";
import { ServerMessages } from "../../../../../../constants/messages.constants";

export async function GET(req: Request, { params }: { params: { id: number } }) {
    try {
        const generalService = new GeneralService();
        return await generalService.getGeneral(Number(params.id));
    } catch (error) {
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}

export async function POST(req: Request, { params }: { params: { id: number } }) {
    try {
        const generalService = new GeneralService();
        const body = await req.json();
        return await generalService.updateGeneral(Number(params.id), body);
    } catch (error) {
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}