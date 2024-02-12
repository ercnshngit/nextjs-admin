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

  async getMenuBySlug(slug: string) {
    const menu = await prisma.menu.findFirst({ where: { slug } });
    if (!menu) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }

    const result = [];

    const submenus = await this.getSubMenus(menu.id);
    result.push({ ...menu, submenus });

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
        previous_id: true,
        next_id: true,
      },
      where: { type_id: typeId, menu_belong_id: null },
    });
    if (!menu || menu.length === 0) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }

    const result = [];
    const sortedMenus = await this.sortMenus(menu);
    for (const menuItem of sortedMenus) {
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
          JSON.stringify({
            message: ErrorMessages.MENU_BELONG_ID_NOT_SAME_ERROR(),
          }),
          { status: 400 }
        );
      }
      console.log(
        firstMenu.previous_id,
        secondMenu.previous_id,
        firstMenu.next_id,
        secondMenu.next_id
      );
      const updatedFirstMenu = await prisma.menu.update({
        // ilk menüyü güncelle
        where: { id: data.first_menu_id },
        include: { previous: true, next: true },
        data: {
          previous_id: secondMenu.previous_id,
          next_id: secondMenu.next_id,
        },
      });
      if (!updatedFirstMenu) {
        return new Response(
          JSON.stringify({
            message: ErrorMessages.UPDATE_FAILED_ERROR(),
            location: "firstMenuIdUpdate",
          }),
          { status: 400 }
        );
      }
      const updatedFirstMenuPreviousAndNextMenus = await prisma.menu.update({
        // ilk menünün önceki ve sonraki menülerini güncelle
        where: { id: data.first_menu_id },
        include: { previous: true, next: true },
        data: {
          previous_menu:
            secondMenu.previous_id == null
              ? {}
              : {
                  update: {
                    data: {
                      next_id: firstMenu.id,
                    },
                  },
                },
          next_menu:
            secondMenu.next_id == null
              ? {}
              : {
                  update: {
                    data: {
                      previous_id: firstMenu.id,
                    },
                  },
                },
        },
      });
      if (!updatedFirstMenuPreviousAndNextMenus) {
        return new Response(
          JSON.stringify({
            message: ErrorMessages.UPDATE_FAILED_ERROR(),
            location: "firstMenuNext&PreviousUpdate",
          }),
          { status: 400 }
        );
      }
      const updatedSecondMenu = await prisma.menu.update({
        where: { id: data.second_menu_id },
        include: { previous: true, next: true },
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

      const updatedSecondMenuPreviousAndNextMenus = await prisma.menu.update({
        // ikinci menünün önceki ve sonraki menülerini güncelle
        where: { id: data.second_menu_id },
        include: { previous: true, next: true },
        data: {
          previous_menu:
            firstMenu.previous_id == null
              ? {}
              : {
                  update: {
                    data: {
                      next_id: secondMenu.id,
                    },
                  },
                },
          next_menu:
            firstMenu.next_id == null
              ? {}
              : {
                  update: {
                    data: {
                      previous_id: secondMenu.id,
                    },
                  },
                },
        },
      });
      if (!updatedSecondMenuPreviousAndNextMenus) {
        return new Response(
          JSON.stringify({
            message: ErrorMessages.UPDATE_FAILED_ERROR(),
            location: "secondMenuNext&PreviousUpdate",
          }),
          { status: 400 }
        );
      }
      return new Response(
        JSON.stringify({
          message: ConfirmMessages.UPDATE_SUCCESS_CONFIRM(),
          firstMenu: updatedFirstMenuPreviousAndNextMenus,
          secondMenu: updatedSecondMenuPreviousAndNextMenus,
        })
      );
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  async sortMenus(data: any[]) {
    try {
      const sortedSubMenus = [];
      // İlk öğeyi bulmak için previous_id'si null olan öğeyi bulun
      console.log(data);
      const firstItem = data.find((item) => item.previous_id === null);
      console.log(firstItem);

      if (firstItem) {
        sortedSubMenus.push(firstItem);

        let currentItem = firstItem;

        // Sonraki öğeleri next_id'leri kullanarak sıralayın
        while (currentItem.next_id) {
          console.log(currentItem.title, currentItem.next_id);
          const nextItem = data.find((item) => item.id === currentItem.next_id);

          if (nextItem) {
            console.log(data.length === sortedSubMenus.length);
            if (data.length === sortedSubMenus.length) break;
            sortedSubMenus.push(nextItem);
            currentItem = nextItem;
          } else {
            break;
          }
        }
      }
      return sortedSubMenus;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getSortedMenus() {
    const menus = await prisma.menu.findMany({
      orderBy: { id: "asc" },
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

    let lastMenuItem = null;
    // next_id prev_id islemleri
    if (data.menu_belong_id) {
      lastMenuItem = await prisma.menu.findFirst({
        where: {
          menu_belong_id: data.menu_belong_id,
          next_id: null,
          type_id: data.type_id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
    } else {
      lastMenuItem = await prisma.menu.findFirst({
        where: {
          next_id: null,
          type_id: data.type_id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
    }

    if (!lastMenuItem) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }

    const menu = await prisma.menu.create({
      data: {
        ...data,
        previous_id: lastMenuItem.id,
      },
    });

    // update previous last item
    const updatedLastMenuItem = await prisma.menu.update({
      where: {
        id: lastMenuItem.id,
      },
      data: {
        next_id: menu.id,
      },
    });

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

  async changeOrder(data: { from: number; to: number; submenu: boolean }) {
    try {
      // TODO: submenu true ise alt menuleri de degistir
      // ayni itemse dur
      if (data.from === data.to) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }

      const fromMenu = await prisma.menu.findFirst({
        where: { id: data.from },
      });
      const toMenu = await prisma.menu.findFirst({ where: { id: data.to } });

      console.log(toMenu);

      if (!fromMenu || !toMenu) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      // from ve to alt altaysa yine dur
      if (
        fromMenu.previous_id === toMenu.id ||
        fromMenu.next_id === toMenu.id
      ) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      if (
        toMenu.previous_id === fromMenu.id ||
        toMenu.next_id === fromMenu.id
      ) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }

      // once from menu
      const fromMenuPrevious = await prisma.menu.findFirst({
        where: { next_id: fromMenu.id },
      });
      const fromMenuNext = await prisma.menu.findFirst({
        where: { previous_id: fromMenu.id },
      });
      // sonra to menu
      const toMenuPrevious = await prisma.menu.findFirst({
        where: { next_id: toMenu.id },
      });
      const toMenuNext = await prisma.menu.findFirst({
        where: { previous_id: toMenu.id },
      });

      // from menunun prev id si to menunun prev id si olacak ve from menunun next id si to menunun id si olacak
      const updatedFromMenu = await prisma.menu.update({
        where: { id: fromMenu.id },
        data: {
          previous_id: toMenuPrevious ? toMenuPrevious.id : null,
          next_id: toMenu.id,
          menu_belong_id: toMenu.menu_belong_id,
        },
      });

      // to menunun prev id si from menu olacak
      const updatedToMenu = await prisma.menu.update({
        where: { id: toMenu.id },
        data: {
          previous_id: fromMenu.id,
          next_id: toMenuNext ? toMenuNext.id : null,
        },
      });

      if (toMenuPrevious) {
        // to menunun prev menusunun next id si from menu olacak
        const updatedToMenuPrevious = await prisma.menu.update({
          where: { id: toMenuPrevious.id },
          data: {
            next_id: fromMenu.id,
          },
        });
      }

      if (fromMenuPrevious) {
        // from menunun prev menusunun next id si from menu next id si olacak
        const updatedFromMenuPrevious = await prisma.menu.update({
          where: { id: fromMenuPrevious.id },
          data: {
            next_id: fromMenuNext ? fromMenuNext.id : null,
          },
        });
      }

      // from menusunun next menusunun prev id si from menu prev id si olacak
      if (fromMenuNext) {
        const updatedFromMenuNext = await prisma.menu.update({
          where: { id: fromMenuNext.id },
          data: {
            previous_id: fromMenuPrevious ? fromMenuPrevious.id : null,
          },
        });
      }

      return new Response(
        JSON.stringify({
          message: ConfirmMessages.UPDATE_SUCCESS_CONFIRM(),
          updatedFromMenu,
          updatedToMenu,
        })
      );
    } catch (error: any) {
      console.log(error);
      return new Response(
        JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }),
        { status: 400 }
      );
    }
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

    if (checkMenuExist.previous_id) {
      if (checkMenuExist.next_id) {
        // onceki itemin nextini suanki itemin nexti yaptik
        await prisma.menu.update({
          where: {
            id: checkMenuExist.previous_id,
          },
          data: {
            next_id: checkMenuExist.next_id,
          },
        });
        await prisma.menu.update({
          where: {
            id: checkMenuExist.next_id,
          },
          data: {
            previous_id: checkMenuExist.previous_id,
          },
        });
      } else {
        await prisma.menu.update({
          where: {
            id: checkMenuExist.previous_id,
          },
          data: {
            next_id: null,
          },
        });
      }
    } else {
      if (checkMenuExist.next_id) {
        await prisma.menu.update({
          where: {
            id: checkMenuExist.next_id,
          },
          data: {
            previous_id: null,
          },
        });
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
