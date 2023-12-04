import { prisma } from "@/libs/prisma";

export class TranslationService {


    async getLanguages() {
        try {
            const languages = await prisma.language.findMany();
            return new Response(JSON.stringify(languages));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async getLanguageByCode(code: any) {
        try {
            const language = await prisma.language.findFirst({
                where: {
                    code: code
                }
            });
            return new Response(JSON.stringify(language));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async getLanguageById(id: number) {
        try {
            const language = await prisma.language.findUnique({
                where: {
                    id: id
                }
            });
            return new Response(JSON.stringify(language));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async updateLanguage(id: number, data: any) {
        try {
            const language = await prisma.language.update({
                where: {
                    id: id
                },
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

    async deleteLanguage(id: number) {
        try {
            const language = await prisma.language.delete({
                where: {
                    id: id
                }
            });
            return new Response(JSON.stringify(language));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async getTranslationsWithKey(key : any) {
        try {
            const translations = await prisma.translation.findFirst({
                where: {
                    key: key
                }
            });
            return new Response(JSON.stringify(translations));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async getTranslationWtihKeyAndLangId(key : any , lang_code : any) {
        try {
            const translations = await prisma.translation.findFirst({
                where: {
                    key: key,
                    language_code : lang_code
                }
            });
            return new Response(JSON.stringify(translations));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }
    
    async createTranslation(data: any) {
        try {
            const translation = await prisma.translation.create({
                data: {
                    key: data.key,
                    language_code: data.language_code,
                    translated_text: data.translated_text
                }
            });
            return new Response(JSON.stringify(translation));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async deleteTranslation(id: number) {
        try {
            const translation = await prisma.translation.delete({
                where: {
                    id: id
                }
            });
            return new Response(JSON.stringify(translation));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async updateTranslation(id: number, data: any) {
        try {
            const translation = await prisma.translation.update({
                where: {
                    id: id
                },
                data: {
                    key: data.key,
                    language_code: data.language_code,
                    translated_text: data.translated_text
                }
            });
            return new Response(JSON.stringify(translation));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async createLanguage(data: any) {
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
}