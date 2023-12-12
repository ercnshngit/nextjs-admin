import { TypeService } from "@/services/types.service";
import { ServerMessages } from "../../../../../../constants/messages.constants";

export async function GET(req: Request, { params }: { params: { id: number } }) {
    try {
        const typesService = new TypeService();
        return await typesService.getType(Number(params.id));
    } catch (error) {
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}

export async function POST(req: Request, { params }: { params: { id: number } }) {
    try {
        const typeService = new TypeService();
        const body = await req.json();
        return await typeService.updateType(Number(params.id), body);
    } catch (error) {
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}
