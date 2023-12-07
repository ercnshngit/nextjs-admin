import { ComponentPropService } from "@/services/component_prop.service";
import { ServerMessages } from "../../../../../constants/messages.constants";


export async function GET(req: Request) {
    try {
        const componentPropService = new ComponentPropService();
        return await componentPropService.getComponentProps();
    } catch (error) {
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
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}
