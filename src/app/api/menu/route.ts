import { MenuService } from "@/services/menu.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const menuService = new MenuService();
  try {
    const response = await menuService.getMenus();
    return cors(req, response);
  } catch (error) {
    console.log(error);
    await menuService.createLog({ error }, req.nextUrl.pathname);
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}

export async function POST(req: NextRequest) {
  const menuService = new MenuService();
  try {
    const body = await req.json();
    const res = await menuService.createMenu(body);
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await menuService.createLog({ error }, req.nextUrl.pathname);
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}

//export async function OPTIONS(request: Request) { 
//  return cors(
//    request,
//    new Response(null, {
//      status: 204,
//    })
//  );
//}
