import { GeneralsService } from "@/services/generals.service";
import { ServerMessages } from "../../../../constants/messages.constants";

export async function GET(req: Request) {
    try {
        const generalsService = new GeneralsService();
        return await generalsService.getGenerals();
    } catch (error) {
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}

export async function POST(req: Request) {
    try {
        const generalsService = new GeneralsService();
        const body = await req.json();
        return await generalsService.createGeneral(body);
    } catch (error) {
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}
