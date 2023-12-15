import { ComponentPropService } from "@/services/component_prop.service";
import { ServerMessages } from "../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";


export async function GET(req: Request) {
    try {
        const componentPropService = new ComponentPropService();
        return await componentPropService.getComponentProps();
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}

export async function POST(req: Request) {
    try {
        const componentPropService = new ComponentPropService();
        const body = await req.json();
        return await componentPropService.createComponentProp(body);
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}
