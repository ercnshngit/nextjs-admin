import { PropService } from "@/services/prop.service";
import { ServerMessages } from "../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";

export async function GET(req: Request) {
    try {
        const propService = new PropService();
        return await propService.getProps();
    } catch (error) {
        console.log(error);
        const logService = new LogService();
        await logService.createLog({ error });
        throw new Error(ServerMessages[500]);
    }
}

export async function POST(req: Request) {
    try {
        const propService = new PropService();
        const body = await req.json();
        return await propService.createProp(body);
    } catch (error) {
        console.log(error);
        const logService = new LogService();
        await logService.createLog({ error });
        throw new Error(ServerMessages[500]);
    }
}
