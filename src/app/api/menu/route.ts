import { MenuService } from "@/services/menu.service";
import { ServerMessages } from "../../../../constants/messages.constants";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";

export async function GET(req: Request) {
  try {
    const menuService = new MenuService();
    const response = await menuService.getMenus();
    return cors(req, response);
  } catch (error) {
    console.log(error);
    const logService = new LogService();
    await logService.createLog({ error });
    return cors(req, new Response(JSON.stringify(error), { status: 400 }));
  }
}

export async function POST(req: Request) {
  try {
    const menuService = new MenuService();
    const body = await req.json();
    return await menuService.createMenu(body);
  } catch (error) {
    console.log(error);
    const logService = new LogService();
    await logService.createLog({ error });
    throw new Error(ServerMessages[500]);
  }
}

export async function OPTIONS(request: Request) {
  return cors(
    request,
    new Response(null, {
      status: 204,
    })
  );
}
