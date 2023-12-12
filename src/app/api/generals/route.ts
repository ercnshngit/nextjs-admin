import { GeneralService } from "@/services/generals.service";
import { ServerMessages } from "../../../../constants/messages.constants";

export async function GET(req: Request) {
    try {
        const generalService = new GeneralService();
        return await generalService.getGenerals();
    } catch (error) {
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}

export async function POST(req: Request) {
    try {
        const generalService = new GeneralService();
        const body = await req.json();
        return await generalService.createGeneral(body);
    } catch (error) {
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}
