import { BlockComponentPropService } from "@/services/block_component_prop.service";
import { ServerMessages } from "../../../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";


export async function GET(req: Request) {
    try {
        const blockComponentPropService = new BlockComponentPropService();
        return await blockComponentPropService.getBlockComponentProps();
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}

export async function POST(req: Request) {
    try {
        const blockComponentPropService = new BlockComponentPropService();
        const body = await req.json();
        return await blockComponentPropService.createBlockComponentProp(body);
    } catch (error) {
        const logService = new LogService();
        await logService.createLog({ error });
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}
