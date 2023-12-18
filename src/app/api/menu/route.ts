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
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}

export async function POST(req: Request) {
  try {
    const menuService = new MenuService();
    const body = await req.json();
    const res = await menuService.createMenu(body);
    return cors(req, res);
  } catch (error) {
    console.log(error);
    const logService = new LogService();
    await logService.createLog({ error });
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
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
