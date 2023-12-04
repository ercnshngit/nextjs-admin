/*import axiosClient from "@/libs/axios";
import { CREATE_MENU_ITEM, UPDATE_MENU_ITEM } from "@/types/menus";

export const getMenu = async () => {
  const { data } = await axiosClient.get("/menu/get/all");
  return data;
};

export const deleteMenu = async (id: number) => {
  const { data } = await axiosClient.delete(`/menu/delete/${id}`);
  return data;
};

export const createMenu = async (data: CREATE_MENU_ITEM) => {
  const { data: responseData } = await axiosClient.post("/menu/create", data);
  return responseData;
};

export const updateMenu = async ({ id, data }: UPDATE_MENU_ITEM) => {
  const { data: responseData } = await axiosClient.post(
    "/menu/set/" + id,
    data
  );
  return responseData;
};

export const getMenuItems = async ({
  slug,
  lang,
}: {
  slug: string;
  lang: "TR" | "EN";
}) => {
  const { data } = await axiosClient.get(`/menu/get/allwith/${slug}/${lang}`);
  return data;
};*/

import { prisma } from "@/libs/prisma";
import { ErrorMessages } from "../../constants/messages.constants";

export class MenuService {

  async getMenu(id: number) {
    const menu = await prisma.menu.findMany({ where: { id } });
    if (!menu || menu.length === 0) {
      return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }));
    }

    const result = [];
    for (const menuItem of menu) {
      const submenus = await this.getSubMenus(menuItem.id);
      result.push({ ...menuItem, submenus });
    }

    return new Response(JSON.stringify(result));
  }

  async getMenus() {
    const menus = await prisma.menu.findMany();
    if (!menus || menus.length === 0) {
      return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }));
    }

    return new Response(JSON.stringify(menus));
  }


  async getMenusByType(name: string) {  //name parametresi, type tablosundaki table_name alanıdır. (örn: "menu" ya da "submenu")
    const menu = await prisma.menu.findMany({ where: { types: { table_name: name } } });
    if (!menu || menu.length === 0) {
      return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }));
    }

    const result = [];
    for (const menuItem of menu) {
      const submenus = await this.getSubMenus(menuItem.id);
      result.push({ ...menuItem, submenus });
    }

    return new Response(JSON.stringify(result));
  }

  async getSubMenus(menuId: number) {
    const submenu = await prisma.menu.findMany({ where: { menu_belong_id: menuId } });
    if (!submenu || submenu.length === 0) {
      return [];
    }

    const submenus = [];
    for (const subItem of submenu) {
      const subsubmenu: any = await this.getSubMenus(subItem.id);
      submenus.push({ ...subItem, submenus: subsubmenu });
    }

    return submenus;
  }


}