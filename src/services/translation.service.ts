import { prisma } from "@/libs/prisma";
import { TranslationDto } from "./dto/translation.dto";
import { LogService } from "./log.service";

export class TranslationService {

    async getTranslationsWithKey(key: string) {
        try {
            const translations = await prisma.translation.findFirst({ where: { key } });
            return new Response(JSON.stringify(translations), { status: 200 });
        } catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            return new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        }
    }

    async getTranslationWithKeyAndLangId(key: string, language_code: string) {
        try {
            const translations = await prisma.translation.findFirst({ where: { key, language_code } });
            return new Response(JSON.stringify(translations), { status: 200 });
        } catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            return new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        }
    }

    async createTranslation(data: TranslationDto) {
        try {
            const translation = await prisma.translation.create({
                data: {
                    key: data.key,
                    language_code: data.language_code,
                    translated_text: data.translated_text
                }
            });
            return new Response(JSON.stringify(translation), { status: 200 });
        } catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            return new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        }
    }

    async deleteTranslation(id: number) {
        try {
            const translation = await prisma.translation.delete({ where: { id } });
            return new Response(JSON.stringify(translation), { status: 200 });
        } catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            return new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        }
    }

    async updateTranslation(id: number, data: TranslationDto) {
        try {
            const translation = await prisma.translation.update({
                where: { id },
                data: {
                    key: data.key,
                    language_code: data.language_code,
                    translated_text: data.translated_text
                }
            });
            return new Response(JSON.stringify(translation), { status: 200 });
        } catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            return new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        }
    }
}