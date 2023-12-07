import { prisma } from "@/libs/prisma";
import { LanguageDto } from "./dto/language.dto";

export class LanguageService {

    async createLanguage(data: LanguageDto) {
        try {
            const language = await prisma.language.create({
                data: {
                    name: data.name,
                    code: data.code
                }
            });
            return new Response(JSON.stringify(language));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async getLanguages() {
        try {
            const languages = await prisma.language.findMany();
            return new Response(JSON.stringify(languages));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async getLanguageByCode(code: string) {
        try {
            const language = await prisma.language.findFirst({ where: { code } });
            return new Response(JSON.stringify(language));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async getLanguageById(id: number) {
        try {
            const language = await prisma.language.findUnique({ where: { id } });
            return new Response(JSON.stringify(language));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async updateLanguage(id: number, data: LanguageDto) {
        try {
            const language = await prisma.language.update({
                where: { id },
                data: { name: data.name, code: data.code }
            });
            return new Response(JSON.stringify(language));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async deleteLanguage(id: number) {
        try {
            const language = await prisma.language.delete({ where: { id } });
            return new Response(JSON.stringify(language));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }
}