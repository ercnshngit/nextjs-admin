import { MenuService } from "@/services/menu.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const service = new MenuService(req);
  try {
    await service.securiyCheck();
    const response = await service.getMenus();
    return cors(req, response);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}

export async function POST(req: NextRequest) {
  const service = new MenuService(req);
  try {
    await service.securiyCheck();
    const body = await req.json();
    const res = await service.createMenu(body);
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}