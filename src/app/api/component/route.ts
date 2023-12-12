import { ComponentService } from "@/services/component.service";
import { ServerMessages } from "../../../../constants/messages.constants";

export async function GET(req: Request) {
  try {
    const componentService = new ComponentService();
    return await componentService.getComponents();
  } catch (error) {
    console.log(error);
    throw new Error(ServerMessages[500]);
  }
}

export async function POST(req: Request) {
  try {
    const componentService = new ComponentService()
    const body = await req.json()
    return await componentService.createComponent(body)
  } catch (error) {
    console.log(error)
    throw new Error(ServerMessages[500])
  }
}