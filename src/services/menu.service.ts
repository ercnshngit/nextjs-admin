import { prisma } from "@/libs/prisma";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { MenuDto } from "./dto/menu.dto";
import { MenuFunctions } from "./functions/menu-functions";
import { LogService } from "./log.service";

const func = new MenuFunctions;

export class MenuService extends LogService{

    async getMenuById(id: number) {
        const menu = await prisma.menu.findMany({ where: { id } });
        if (!menu || menu.length === 0) {
            return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }), { status: 404 });
        }

        const result = [];
        for (const menuItem of menu) {
            const submenus = await this.getSubMenus(menuItem.id);
            result.push({ ...menuItem, submenus });
        }

        return new Response(JSON.stringify(result));
    }

    async getMenuBySlug(slug: string) {
        const menu = await prisma.menu.findMany({ where: { slug } });
        if (!menu || menu.length === 0) {
            return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }), { status: 404 });
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
            return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }), { status: 404 });
        }

        return new Response(JSON.stringify(menus));
    }

    async getMenusByType(id: number) {
        const menu = await prisma.menu.findMany({ where: { type_id: id, menu_belong_id: null } });
        if (!menu || menu.length === 0) {
            return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }), { status: 404 });
        }

        const result = [];
        for (const menuItem of menu) {
            const submenus = await this.getSubMenus(menuItem.id);
            result.push({ ...menuItem, submenus });
        }

        return new Response(JSON.stringify(result));
    }

    async getMenuByTypeAndId(typeId: number, id: number) {
        const menu = await prisma.menu.findFirst({ where: { type_id: typeId, id } });
        if (!menu) {
            return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }), { status: 404 });
        }

        const result = [];
        const submenus = await this.getSubMenus(menu.id);
        result.push({ menu, submenus });

        return new Response(JSON.stringify(result));
    }

    async getMenuByTypeAndSlug(typeId: number, slug: string) {
        const menu = await prisma.menu.findFirst({ where: { type_id: typeId, slug } });
        if (!menu) {
            return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }), { status: 404 });
        }

        const result = [];
        const submenus = await this.getSubMenus(menu.id);
        result.push({ menu, submenus });

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
        if (data.type_id && !(await func.checkTypeExist(data.type_id))) {
            return new Response(JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() }), { status: 404 });
        }

        if (data.menu_belong_id && !(await func.checkMenuBelongExist(data.menu_belong_id))) {
            return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }), { status: 404 });
        }

        if (data.title) {
            data.slug = data.slug ?? await func.slugCreator(data.title);
            data.route = data.route ?? `/${data.slug}`;
        }

        const menu = await prisma.menu.create({ data });

        if (!menu) { return new Response(JSON.stringify({ message: ErrorMessages.CREATE_FAILED_ERROR() }), { status: 400 }) }

        return new Response(JSON.stringify(menu));
    }

    async updateMenu(id: number, data: MenuDto) {
        let msg: any = "";
        const menuExist = await func.checkMenuExist(id);

        !menuExist ? msg = ErrorMessages.MENU_NOT_FOUND_ERROR()
            : data.type_id && !(await func.checkTypeExist(data.type_id)) ? msg = ErrorMessages.TYPE_NOT_FOUND_ERROR()
                : data.menu_belong_id && !(await func.checkMenuBelongExist(data.menu_belong_id)) ? msg = ErrorMessages.MENU_NOT_FOUND_ERROR()
                    : data.title ? data.slug = data.slug ?? await func.slugCreator(data.title) : data.route = data.route ?? `/${data.slug}`;

        if (msg) { return new Response(JSON.stringify({ message: msg }), { status: 404 }) }

        Object.assign(menuExist, data);

        const updatedMenu = await prisma.menu.update({ where: { id }, data });

        if (!updatedMenu) { return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }), { status: 400 }) }

        return new Response(JSON.stringify(updatedMenu));
    }

    async deleteMenu(id: number) {
        const checkMenuExist = await prisma.menu.findUnique({ where: { id } });
        if (!checkMenuExist) {
            return new Response(JSON.stringify({ message: ErrorMessages.MENU_NOT_FOUND_ERROR() }), { status: 404 });
        }
        if (checkMenuExist.menu_belong_id !== null) {
            const checkMenuBelongExist = await prisma.menu.findFirst({ where: { id: checkMenuExist.menu_belong_id } });
            if (checkMenuBelongExist) {
                return new Response(JSON.stringify({ message: ErrorMessages.MENU_BELONG_DELETE_ERROR(), menuBelong: checkMenuBelongExist }), { status: 400 });
            }
        }
        const menu = await prisma.menu.delete({ where: { id } });
        if (!menu) return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }), { status: 400 });
        return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }), { status: 200 });
    }

}