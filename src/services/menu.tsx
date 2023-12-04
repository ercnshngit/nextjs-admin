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
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { MenuDto } from "./dto/menu.dto";
import { Function } from "./functions/function";

const func = new Function;

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

  async createMenu(data: MenuDto) {
    if (data.menu_belong_id) {
      const checkMenuBelongExist = await prisma.menu.findMany({ where: { id: data.menu_belong_id } });
      if (!checkMenuBelongExist || checkMenuBelongExist.length === 0) {
        return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }));
      }
    }

    !data.slug ? data.slug = await func.slugCreator(data.title)
      : !data.route ? data.route = '/' + await func.slugCreator(data.title) : null;

    const menu = await prisma.menu.create({ data });
    if (!menu) return new Response(JSON.stringify({ message: ErrorMessages.CREATE_FAILED_ERROR() }));
    return new Response(JSON.stringify(menu));
  }

  async updateMenu(id: number, data: MenuDto) {
    const checkMenuExist = await prisma.menu.findUnique({ where: { id } });
    if (!checkMenuExist) {
      return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }));
    }
    if (data.type_id) {
      const checkTypeExist = await prisma.types.findUnique({ where: { id: data.type_id } });
      if (!checkTypeExist) {
        return new Response(JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() }));
      }
    }
    if (data.menu_belong_id) {
      const checkMenuBelongExist = await prisma.menu.findMany({ where: { id: data.menu_belong_id } });
      if (!checkMenuBelongExist || checkMenuBelongExist.length === 0) {
        return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }));
      }
    }

    data.title ? !data.slug ? data.slug = await func.slugCreator(data.title)
      : !data.route ? data.route = '/' + await func.slugCreator(data.title) : null : null;

    Object.assign(checkMenuExist, data);
    const menu = await prisma.menu.update({ where: { id }, data });
    if (!menu) return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }));
    return new Response(JSON.stringify(menu));
  }

  async deleteMenu(id: number) {
    const checkMenuExist = await prisma.menu.findUnique({ where: { id } });
    if (!checkMenuExist) {
      return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }));
    }
    if (checkMenuExist.menu_belong_id !== null) {
      const checkMenuBelongExist = await prisma.menu.findFirst({ where: { id: checkMenuExist.menu_belong_id } });
      if (checkMenuBelongExist) {
        return new Response(JSON.stringify({ message: ErrorMessages.MENU_BELONG_DELETE_ERROR(), menuBelong: checkMenuBelongExist }));
      }
    }
    const menu = await prisma.menu.delete({ where: { id } });
    if (!menu) return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }));
    return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }));
  }

}