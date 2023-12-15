import { prisma } from "@/libs/prisma";
import {
  ConfirmMessages,
  ErrorMessages,
} from "../../constants/messages.constants";
import { GeneralDto } from "./dto/general.dto";
import { LogService } from "./log.service";

export class GeneralService {
  async getGeneralById(id: number) {
    const general = await prisma.general.findUnique({ where: { id } });
    if (!general) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(general));
  }

  async getGeneralsBySlug(slug: string) {
    const general = await prisma.general.findMany({ where: { slug } });
    if (!general) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(general));
  }

  async getGenerals() {
    const generals = await prisma.general.findMany();
    if (generals.length < 1) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(generals));
  }

  async createGeneral(data: GeneralDto) {
    try {
      const general = await prisma.general.create({ data });
      if (!general) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify(general));
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error })
      );
    }
  }

  async updateGeneral(id: number, data: GeneralDto) {
    try {
      const general = await prisma.general.findUnique({ where: { id } });
      if (!general) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      Object.assign(general, data);
      const new_general = await prisma.general.update({ where: { id }, data });
      if (!new_general) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }),
          { status: 400 }
        );
      }
      return new Response(JSON.stringify(new_general));
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error })
      );
    }
  }

  async deleteGeneral(id: number) {
    try {
      const general = await prisma.general.findUnique({ where: { id } });
      if (!general) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      const delete_general = await prisma.general.delete({ where: { id } });
      if (!delete_general) {
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
