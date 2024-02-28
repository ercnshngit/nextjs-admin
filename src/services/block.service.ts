import { prisma } from "@/libs/prisma";
import { BlockDto } from "@/services/dto/block.dto";
import {
  ConfirmMessages,
  ErrorMessages,
} from "../../constants/messages.constants";
import { LogService } from "./log.service";
import { BaseService } from "./base.service";

export class BlockService extends BaseService {
  constructor(request?: any) {
    super(request);
  }

  async getBlock(id: number) {
    const block = await this.checkBlockExist(id);
    if (block instanceof Response) {
      return block;
    }
    return new Response(JSON.stringify(block), { status: 200 });
  }

  async createBlock(data: BlockDto) {
    try {
      if (data.type_id) {
        const checkType = await this.checkTypeExist(data.type_id);
        if (checkType instanceof Response) {
          return checkType;
        }
      }
      const block = await prisma.block.create({ data });
      if (!block) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.BLOCK_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify(block));
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error })
      );
    }
  }

  async createBlockWithComponents(data: BlockDto) {
    try {
      if (data.type_id) {
        const checkType = await this.checkTypeExist(data.type_id);
        if (checkType instanceof Response) {
          return checkType;
        }
      }

      const new_block = await prisma.block.create({ data });
      if (!new_block) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }),
          { status: 400 }
        );
      }
      return new Response(JSON.stringify(new_block));
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error })
      );
    }
  }

  async updateBlock(id: number, data: BlockDto) {
    try {
      if (data.type_id) {
        const checkType = await this.checkTypeExist(data.type_id);
        if (checkType instanceof Response) {
          return checkType;
        }
      }
      const block = await this.checkBlockExist(id);
      Object.assign(block, data);
      const new_block = await prisma.block.update({ where: { id }, data });
      if (!new_block) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }),
          { status: 400 }
        );
      }
      return new Response(JSON.stringify(new_block));
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error }),

        { status: 400 }
      );
    }
  }

  async deleteBlock(id: number) {
    try {
      const block = await this.checkBlockExist(id);
      if (block instanceof Response) {
        return block;
      }
      const delete_block = await prisma.block.delete({ where: { id } });
      if (!delete_block) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }),
          { status: 400 }
        );
      }
      return new Response(
        JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() })
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

  async checkBlockExist(id: number) {
    const block = await prisma.block.findUnique({ where: { id: Number(id) } });
    if (!block) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.BLOCK_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }
    return block;
  }

  async checkTypeExist(id: number) {
    const type = await prisma.type.findUnique({ where: { id } });
    if (!type) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }
    return type;
  }
}
