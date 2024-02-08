import { prisma } from "@/libs/prisma";
import { getErrorMessage } from "@/utils/error-resolver";
import { TranslationConstants } from "../../constants/translation.constants";
import { BaseService } from "./base.service";
import { TranslationDto } from "./dto/translation.dto";

export class TranslationService extends BaseService {
  constructor(request?: any) {
    super(request);
  }

  async getTranslationsWithKey(key: string) {
    try {
      const translations = await prisma.translation.findFirst({
        where: { key },
      });
      return new Response(JSON.stringify(translations), { status: 200 });
    } catch (error: any) {
      await this.createLog({ error });
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async getTranslationWithKeyAndLangId(key: string, language_code: string) {
    try {
      const translations = await prisma.translation.findFirst({
        where: { key, language_code },
      });
      return new Response(JSON.stringify(translations), { status: 200 });
    } catch (error) {
      await this.createLog({ error });
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async createTranslation(data: TranslationDto) {
    try {
      const translation = await prisma.translation.create({
        data: {
          key: data.key,
          language_code: data.language_code,
          translated_text: data.translated_text,
        },
      });
      return new Response(JSON.stringify(translation), { status: 200 });
    } catch (error: any) {
      console.log("error message : ", getErrorMessage(error));
      await this.createLog({ error });
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async deleteTranslation(id: number) {
    try {
      const translation = await prisma.translation.delete({ where: { id } });
      return new Response(JSON.stringify(translation), { status: 200 });
    } catch (error) {
      await this.createLog({ error });
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async updateTranslation(id: number, data: TranslationDto) {
    try {
      const translation = await prisma.translation.update({
        where: { id },
        data: {
          key: data.key,
          language_code: data.language_code,
          translated_text: data.translated_text,
        },
      });
      return new Response(JSON.stringify(translation), { status: 200 });
    } catch (error) {
      await this.createLog({ error });
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async createAllBasicTranslations() {
    try {
      //delete existing
      await prisma.translation.deleteMany({});
      await prisma.language.deleteMany({});
      const resultLanguage = await prisma.$queryRawUnsafe(
        TranslationConstants.LANGUAGE_QUERY
      );

      const resultTranslation = await prisma.translation.createMany({
        data: TranslationConstants.TRANSLATIONS_ARRAY.map(
          (translation, index) => {
            return Object.entries(translation.langs).map((lang, i) => ({
              key: translation.key,
              language_code: lang[0],
              translated_text: lang[1],
            }));
          }
        ).flat(),
      });
      console.log("resultLanguage : ", resultTranslation);
      return resultLanguage && resultTranslation
        ? { resultLanguage, resultTranslation }
        : null;
    } catch (error) {
      await this.createLog({ error });
      throw new Error(String(error));
    }
  }
}
