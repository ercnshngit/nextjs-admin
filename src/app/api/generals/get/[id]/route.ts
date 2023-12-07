import { GeneralsService } from "@/services/generals.service";
import { ServerMessages } from "../../../../../../constants/messages.constants";

export async function GET(req: Request, { params }: { params: { id: number } }) {
    try {
        const generalsService = new GeneralsService();
        return await generalsService.getGeneral(Number(params.id));
    } catch (error) {
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}

export async function POST(req: Request, { params }: { params: { id: number } }) {
    try {
        const generalsService = new GeneralsService();
        const body = await req.json();
        return await generalsService.updateGeneral(Number(params.id), body);
    } catch (error) {
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}