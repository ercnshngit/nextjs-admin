import { prisma } from "@/libs/prisma";
import {
  ConfirmMessages,
  ErrorMessages,
} from "../../constants/messages.constants";
import { MenuDto, MenuOrderUpdateDto } from "./dto/menu.dto";
import { BaseService } from "./base.service";

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

  async getMenuByTypeName(name: string) {
    const type = await prisma.type.findFirst({ where: { name } });

    if (!type) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }

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
      where: { type_id: type.id, menu_belong_id: null },
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

  async sortMenus(data: any[]) {
    try {
      const sortedSubMenus = [];
      // İlk öğeyi bulmak için previous_id'si null olan öğeyi bulun
      const firstItem = data.find((item) => item.previous_id === null);

      if (firstItem) {
        sortedSubMenus.push(firstItem);

        let currentItem = firstItem;

        // Sonraki öğeleri next_id'leri kullanarak sıralayın
        while (currentItem.next_id) {
          const nextItem = data.find((item) => item.id === currentItem.next_id);

          if (nextItem) {
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
    if (data.type_id && !(await this.checkTypeExist(data.type_id))) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }

    if (
      data.menu_belong_id &&
      !(await this.checkMenuBelongExist(data.menu_belong_id))
    ) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }

    if (data.title) {
      data.slug = data.slug ?? (await this.slugCreator(data.title));
      data.route =
        data.route || data.route === "" ? `/${data.slug}` : data.route;
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
    let menu;
    if (!lastMenuItem) {
      menu = await prisma.menu.create({
        data: {
          ...data,
          menu_belong_id:
            data.menu_belong_id === 0 ? null : data.menu_belong_id,
        },
      });
    } else {
      menu = await prisma.menu.create({
        data: {
          ...data,
          previous_id: lastMenuItem.id,
          menu_belong_id:
            data.menu_belong_id === 0 ? null : data.menu_belong_id,
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
    }

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
    const menuExist = await this.checkMenuExist(id);

    !menuExist
      ? (msg = ErrorMessages.MENU_NOT_FOUND_ERROR())
      : data.type_id && !(await this.checkTypeExist(data.type_id))
      ? (msg = ErrorMessages.TYPE_NOT_FOUND_ERROR())
      : data.menu_belong_id &&
        !(await this.checkMenuBelongExist(data.menu_belong_id))
      ? (msg = ErrorMessages.MENU_NOT_FOUND_ERROR())
      : data.title
      ? (data.slug = data.slug ?? (await this.slugCreator(data.title)))
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
      console.log(fromMenu);

      if (!fromMenu || !toMenu) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      // from ve to alt altaysa yine dur
      if (fromMenu.previous_id === toMenu.id) {
        // switch
        await prisma.menu.update({
          where: { id: fromMenu.id },
          data: { previous_id: toMenu.previous_id, next_id: toMenu.id },
        });
        await prisma.menu.update({
          where: { id: toMenu.id },
          data: { previous_id: fromMenu.id, next_id: fromMenu.next_id },
        });
        if (fromMenu.next_id) {
          await prisma.menu.update({
            where: { id: fromMenu.next_id },
            data: {
              previous_id: toMenu.id,
            },
          });
        }
        if (toMenu.previous_id) {
          await prisma.menu.update({
            where: { id: toMenu.previous_id },
            data: {
              next_id: fromMenu.id,
            },
          });
        }

        return new Response(
          JSON.stringify({
            message: ConfirmMessages.UPDATE_SUCCESS_CONFIRM(),
          })
        );
      }

      if (fromMenu.next_id === toMenu.id) {
        // switch
        await prisma.menu.update({
          where: { id: fromMenu.id },
          data: { previous_id: toMenu.id, next_id: toMenu.next_id },
        });
        await prisma.menu.update({
          where: { id: toMenu.id },
          data: { previous_id: fromMenu.previous_id, next_id: fromMenu.id },
        });
        if (fromMenu.previous_id) {
          await prisma.menu.update({
            where: { id: fromMenu.previous_id },
            data: {
              next_id: toMenu.id,
            },
          });
        }
        if (toMenu.next_id) {
          await prisma.menu.update({
            where: { id: toMenu.next_id },
            data: {
              previous_id: fromMenu.id,
            },
          });
        }

        return new Response(
          JSON.stringify({
            message: ConfirmMessages.UPDATE_SUCCESS_CONFIRM(),
          })
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

  async removeSpecialChars(text: string) {
    return text.replace(/[^\w\s-]/g, "");
  }

  async convertTurkishWords(text: string) {
    const turkishChars = "çğıöşüÇĞİÖŞÜ ";
    const englishChars = "cgiosuCGIOSU-";

    let result = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const index = turkishChars.indexOf(char);

      if (index !== -1) {
        result += englishChars[index];
      } else {
        result += char === " " ? "-" : char;
      }
    }

    return await this.removeSpecialChars(result.toLowerCase());
  }

  async slugCreator(value: string) {
    const tr = await this.convertTurkishWords(value);
    const slug = tr
      .toLowerCase()
      .replace(/[\s_-]+/g, "-")
      .trim();

    return slug;
  }

  async checkMenuExist(menuId: number): Promise<boolean> {
    const checkMenuExist = await prisma.menu.findUnique({
      where: { id: menuId },
    });
    return !!checkMenuExist;
  }

  async checkTypeExist(typeId: number): Promise<boolean> {
    const checkTypeExist = await prisma.type.findUnique({
      where: { id: typeId },
    });
    return !!checkTypeExist;
  }

  async checkMenuBelongExist(menuBelongId: number): Promise<boolean> {
    const checkMenuBelongExist = await prisma.menu.findMany({
      where: { id: menuBelongId },
    });
    return checkMenuBelongExist && checkMenuBelongExist.length > 0;
  }
}
