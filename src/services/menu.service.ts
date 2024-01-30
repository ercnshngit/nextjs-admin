import { prisma } from "@/libs/prisma";
import {
  ConfirmMessages,
  ErrorMessages,
} from "../../constants/messages.constants";
import { MenuDto, MenuOrderUpdateDto } from "./dto/menu.dto";
import { MenuFunctions } from "./functions/menu-functions";
import { BaseService } from "./base.service";

const func = new MenuFunctions();

export class MenuService extends BaseService {
  constructor(request?: any) {
    super(request);
  }

  async getMenuById(id: number) {
    const menu = await prisma.menu.findMany({ where: { id } });
    if (!menu || menu.length === 0) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }

    const result = [];
    for (const menuItem of menu) {
      const submenus = await this.getSubMenus(menuItem.id);
      result.push({ ...menuItem, submenus });
    }

    return new Response(JSON.stringify(result));
  }

  async getMenuByTypeId(typeId: number) {
    const menu = await prisma.menu.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        type_id: true,
        menu_belong_id: true,
        route: true,
        status: true,
      },
      where: { type_id: typeId, menu_belong_id: null},
    });
    if (!menu || menu.length === 0) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
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
      return new Response(
        JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(menus));
  }

  async updateMenuOrder(data: MenuOrderUpdateDto) {
    try {
      const firstMenu = await prisma.menu.findUnique({
        where: { id: data.first_menu_id },
      });
      if (!firstMenu) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
  
      const secondMenu = await prisma.menu.findUnique({
        where: { id: data.second_menu_id },
      });
      if (!secondMenu) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      if (firstMenu.menu_belong_id !== secondMenu.menu_belong_id) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.MENU_BELONG_ID_NOT_SAME_ERROR() }),
          { status: 400 }
        );
      }
      console.log(firstMenu.previous_id , secondMenu.previous_id , firstMenu.next_id , secondMenu.next_id);
      const updatedFirstMenu = await prisma.menu.update({ // ilk menüyü güncelle
        where: { id: data.first_menu_id },
        include: { previous: true, next: true},
        data: { 
          previous_id: secondMenu.previous_id,
          next_id: secondMenu.next_id,
        }
      });
      if (!updatedFirstMenu) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() , location: "firstMenuIdUpdate"}),
          { status: 400 }
        );
      }
      const updatedFirstMenuPreviousAndNextMenus = await prisma.menu.update({ // ilk menünün önceki ve sonraki menülerini güncelle
        where: { id: data.first_menu_id },
        include: { previous: true, next: true},
        data: { 
          previous_menu: secondMenu.previous_id == null ? {} : {
            update:{
              data:{
                next_id: firstMenu.id,
              }
            }
          },
          next_menu: secondMenu.next_id == null ? {} : {
            update:{
              data:{
                previous_id: firstMenu.id,
              }
            }
          },
        }
      });
      if (!updatedFirstMenuPreviousAndNextMenus) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() , location: "firstMenuNext&PreviousUpdate"}),
          { status: 400 }
        );
      }
      const updatedSecondMenu = await prisma.menu.update({ 
        where: { id: data.second_menu_id },
        include: { previous: true, next: true},
        data: {
          previous_id: firstMenu.previous_id,
          next_id: firstMenu.next_id, 
        },
      });
      if (!updatedSecondMenu) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }),
          { status: 400 }
        );
      }
  
      const updatedSecondMenuPreviousAndNextMenus = await prisma.menu.update({ // ikinci menünün önceki ve sonraki menülerini güncelle
        where: { id: data.second_menu_id },
        include: { previous: true, next: true},
        data: { 
          previous_menu: firstMenu.previous_id == null ? {} : {
            update:{
              data:{
                next_id: secondMenu.id,
              }
            }
          },
          next_menu: firstMenu.next_id == null ? {} : {
            update:{
              data:{
                previous_id: secondMenu.id,
              }
            }
          },
        }
      });
      if (!updatedSecondMenuPreviousAndNextMenus) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() , location: "secondMenuNext&PreviousUpdate"}),
          { status: 400 }
        );
      }
      return new Response(JSON.stringify({ message: ConfirmMessages.UPDATE_SUCCESS_CONFIRM() , firstMenu : updatedFirstMenuPreviousAndNextMenus, secondMenu: updatedSecondMenuPreviousAndNextMenus}));
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  async sortMenus(data: any[]) {
    try {
      const sortedSubMenus = [];
        // İlk öğeyi bulmak için previous_id'si null olan öğeyi bulun
      const firstItem = data.find(item => item.previous_id === null);
      
      if (firstItem) {
        sortedSubMenus.push(firstItem);
        
        let currentItem = firstItem;
        
        // Sonraki öğeleri next_id'leri kullanarak sıralayın
        while (currentItem.next_id) {
          const nextItem = data.find(item => item.id === currentItem.next_id);
          
          if (nextItem) {
            if(data.length === sortedSubMenus.length) break;
            sortedSubMenus.push(nextItem);
            currentItem = nextItem;
          } else {
            break;
          }
        }
      }
      return sortedSubMenus;
    } catch (error : any) {
      console.log(error);
      throw new Error(error);
    }
  }


  async getSortedMenus(){
    const menus = await prisma.menu.findMany({
      orderBy: { id: 'asc' },
    });
    if (!menus || menus.length === 0) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(menus));
  }

  async getMenusByType(id: number) {
    const menu = await prisma.menu.findMany({
      where: { type_id: id, menu_belong_id: null },
    });
    if (!menu || menu.length === 0) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }

    const result = [];
    for (const menuItem of menu) {
      const submenus = await this.getSubMenus(menuItem.id);
      result.push({ ...menuItem, submenus });
    }

    return new Response(JSON.stringify(result));
  }

  async getMenuByTypeAndId(typeId: number, id: number) {
    const menu = await prisma.menu.findFirst({
      where: { type_id: typeId, id },
    });
    if (!menu) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }

    const result = [];
    const submenus = await this.getSubMenus(menu.id);
    result.push({ menu, submenus });

    return new Response(JSON.stringify(result));
  }

  async getMenuByTypeAndSlug(typeId: number, slug: string) {
    const menu = await prisma.menu.findFirst({
      where: { type_id: typeId, slug },
    });
    if (!menu) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }

    const result = [];
    const submenus = await this.getSubMenus(menu.id);
    result.push({ menu, submenus });

    return new Response(JSON.stringify(result));
  }

  async getSubMenus(menuId: number) {
    const submenu = await prisma.menu.findMany({
      where: { menu_belong_id: menuId },
    });
    if (!submenu || submenu.length === 0) {
      return [];
    }

    const submenus = [];
    for (const subItem of submenu) {
      const subsubmenu: any = await this.getSubMenus(subItem.id);
      submenus.push({ ...subItem, submenus: subsubmenu });
    }
    const sortedSubMenus = await this.sortMenus(submenus);
    return sortedSubMenus;
  }

  async createMenu(data: MenuDto) {
    if (data.type_id && !(await func.checkTypeExist(data.type_id))) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }

    if (
      data.menu_belong_id &&
      !(await func.checkMenuBelongExist(data.menu_belong_id))
    ) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }

    if (data.title) {
      data.slug = data.slug ?? (await func.slugCreator(data.title));
      data.route = data.route ?? `/${data.slug}`;
    }

    const menu = await prisma.menu.create({ data });

    if (!menu) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.CREATE_FAILED_ERROR() }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify(menu));
  }

  async updateMenu(id: number, data: MenuDto) {
    let msg: any = "";
    const menuExist = await func.checkMenuExist(id);

    !menuExist
      ? (msg = ErrorMessages.MENU_NOT_FOUND_ERROR())
      : data.type_id && !(await func.checkTypeExist(data.type_id))
        ? (msg = ErrorMessages.TYPE_NOT_FOUND_ERROR())
        : data.menu_belong_id &&
            !(await func.checkMenuBelongExist(data.menu_belong_id))
          ? (msg = ErrorMessages.MENU_NOT_FOUND_ERROR())
          : data.title
            ? (data.slug = data.slug ?? (await func.slugCreator(data.title)))
            : (data.route = data.route ?? `/${data.slug}`);

    if (msg) {
      return new Response(JSON.stringify({ message: msg }), { status: 404 });
    }

    Object.assign(menuExist, data);

    const updatedMenu = await prisma.menu.update({ where: { id }, data });

    if (!updatedMenu) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify(updatedMenu));
  }

  async deleteMenu(id: number) {
    const checkMenuExist = await prisma.menu.findUnique({ where: { id } });
    if (!checkMenuExist) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }
    if (checkMenuExist.menu_belong_id !== null) {
      const checkMenuBelongExist = await prisma.menu.findFirst({
        where: { id: checkMenuExist.menu_belong_id },
      });
      if (checkMenuBelongExist) {
        return new Response(
          JSON.stringify({
            message: ErrorMessages.MENU_BELONG_DELETE_ERROR(),
            menuBelong: checkMenuBelongExist,
          }),
          { status: 400 }
        );
      }
    }
    const menu = await prisma.menu.delete({ where: { id } });
    if (!menu)
      return new Response(
        JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }),
        { status: 400 }
      );
    return new Response(
      JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }),
      { status: 200 }
    );
  }
}
