import { GeneralService } from "@/services/general.service";
import { ServerMessages } from "../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";

export async function GET(req: Request) {
    try {
        const generalService = new GeneralService();
        return await generalService.getGenerals();
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
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
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}
