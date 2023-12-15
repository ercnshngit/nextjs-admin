import { ComponentPropService } from "@/services/component_prop.service";
import { ServerMessages } from "../../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";


export async function GET(req: Request, { params }: { params: { id: number } }) {
    try {
        const componentPropService = new ComponentPropService();
        return await componentPropService.getComponentProp(Number(params.id));
    } catch (error) {
        console.log(error);
        const logService = new LogService();
        await logService.createLog({ error });
        throw new Error(ServerMessages[500]);
    }
}

export async function POST(req: Request, { params }: { params: { id: number } }) {
    try {
        const componentPropService = new ComponentPropService();
        const body = await req.json();
        return await componentPropService.updateComponentProp(Number(params.id), body);
    } catch (error) {
        console.log(error);
        const logService = new LogService();
        await logService.createLog({ error });
        throw new Error(ServerMessages[500]);
    }
}