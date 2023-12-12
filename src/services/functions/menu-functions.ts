import { prisma } from "@/libs/prisma";

export class MenuFunctions {

    async removeSpecialChars(text: string) {
        return text.replace(/[^\w\s-]/g, '');
    }

    async convertTurkishWords(text: string) {
        const turkishChars = 'çğıöşüÇĞİÖŞÜ ';
        const englishChars = 'cgiosuCGIOSU-';

        let result = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const index = turkishChars.indexOf(char);

            if (index !== -1) {
                result += englishChars[index];
            } else {
                result += char === ' ' ? '-' : char;
            }
        }

        return await this.removeSpecialChars(result.toLowerCase());
    }


    async slugCreator(value: string) {
        const tr = await this.convertTurkishWords(value);
        const slug = tr
            .toLowerCase()
            .replace(/[\s_-]+/g, '-')
            .trim();

        return slug;
    }

    async checkMenuExist(menuId: number): Promise<boolean> {
        const checkMenuExist = await prisma.menu.findUnique({ where: { id: menuId } });
        return !!checkMenuExist;
    }

    async checkTypeExist(typeId: number): Promise<boolean> {
        const checkTypeExist = await prisma.type.findUnique({ where: { id: typeId } });
        return !!checkTypeExist;
    }

    async checkMenuBelongExist(menuBelongId: number): Promise<boolean> {
        const checkMenuBelongExist = await prisma.menu.findMany({ where: { id: menuBelongId } });
        return checkMenuBelongExist && checkMenuBelongExist.length > 0;
    }
}