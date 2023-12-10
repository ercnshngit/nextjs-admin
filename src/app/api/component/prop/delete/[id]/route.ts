import { ComponentPropService } from "@/services/component_prop.service";
import { ServerMessages } from "../../../../../../../constants/messages.constants";

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
    try {
        const componentPropService = new ComponentPropService();
        return await componentPropService.deleteComponentProp(Number(params.id));
    } catch (error) {
        console.log(error);
        throw new Error(ServerMessages[500]);
    }
}