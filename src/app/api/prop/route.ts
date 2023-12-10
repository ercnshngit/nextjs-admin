import { PropService } from "@/services/prop.service";
import { ServerMessages } from "../../../../constants/messages.constants";

export async function GET(req: Request) {
    try {
        const propService = new PropService();
        return await propService.getProps();
    } catch (error) {
        console.log(error);
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
        throw new Error(ServerMessages[500]);
    }
}
