import { prisma } from "@/libs/prisma";
import { DataLanguageDto } from "./dto/data_language.dto";
import {
  ConfirmMessages,
  ErrorMessages,
} from "../../constants/messages.constants";
import { LogService } from "./log.service";
import { BaseService } from "./base.service";

export class DataLanguageService extends BaseService {
  constructor(request?: any) {
    super(request);
  }

  async getDataLanguage(id: number) {
    const data_language = await prisma.data_language.findUnique({
      where: { id },
    });
    if (!data_language) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(data_language));
  }

  async getDataLanguages() {
    const data_languages = await prisma.data_language.findMany();
    if (data_languages.length < 1) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(data_languages));
  }

  async getDataLanguagesByTable(table_name: string) {
    const table = await prisma.database_table.findFirst({
      where: { name: table_name },
    });
    if (!table) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }
    const data_languages = await prisma.data_language.findMany({
      where: { database_table_id: table.id },
    });
    if (data_languages.length < 1) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(data_languages));
  }

  async createDataLanguage(data: DataLanguageDto) {
    try {
      const data_language = await prisma.data_language.create({ data });
      if (!data_language) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify(data_language));
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error })
      );
    }
  }

  async updateDataLanguage(id: number, data: DataLanguageDto) {
    try {
      const data_language = await prisma.data_language.findUnique({
        where: { id },
      });
      if (!data_language) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      Object.assign(data_language, data);
      const new_data_language = await prisma.data_language.update({
        where: { id },
        data,
      });
      if (!new_data_language) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }),
          { status: 400 }
        );
      }
      return new Response(JSON.stringify(new_data_language));
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error })
      );
    }
  }

  async deleteDataLanguage(id: number) {
    try {
      const data_language = await prisma.data_language.findUnique({
        where: { id },
      });
      if (!data_language) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      const delete_data_language = await prisma.data_language.delete({
        where: { id },
      });
      if (!delete_data_language) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }),
          { status: 400 }
        );
      }
      return new Response(
        JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }),
        { status: 200 }
      );
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error })
      );
    }
  }
}
