import { prisma } from "@/libs/prisma";
import { BlockDto } from "@/services/dto/block.dto";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";

export class BlockService {
    async getBlock(id: number) {
        const block = await prisma.block.findUnique({ where: { id } })
        if (!block) { return new Response(JSON.stringify({ message: ErrorMessages.BLOCK_NOT_FOUND_ERROR() })); }
        return new Response(JSON.stringify(block));
    }

    async getBlocks() {
        const blocks = await prisma.block.findMany()
        if (blocks.length < 1) { return new Response(JSON.stringify({ message: ErrorMessages.BLOCK_NOT_FOUND_ERROR() })); }
        return new Response(JSON.stringify(blocks));
    }

    async createBlock(data: BlockDto) {
        try {
            const checkType = await prisma.types.findUnique({ where: { id: data.type_id } })
            if (!checkType) { return new Response(JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() })); }
            const block = await prisma.block.create({ data })
            if (!block) { return new Response(JSON.stringify({ message: ErrorMessages.BLOCK_NOT_FOUND_ERROR() })); }
            return new Response(JSON.stringify(block));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async updateBlock(id: number, data: BlockDto) {
        try {
            if (data.type_id) {
                const checkType = await prisma.types.findUnique({ where: { id: data.type_id } })
                if (!checkType) { return new Response(JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() })); }
            }
            const block = await prisma.block.findUnique({ where: { id } })
            if (!block) { return new Response(JSON.stringify({ message: ErrorMessages.BLOCK_NOT_FOUND_ERROR() })); }
            Object.assign(block, data)
            const new_block = await prisma.block.update({ where: { id }, data })
            if (!new_block) { return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() })); }
            return new Response(JSON.stringify(new_block));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async deleteBlock(id: number) {
        try {
            const block = await prisma.block.findUnique({ where: { id } })
            if (!block) { return new Response(JSON.stringify({ message: ErrorMessages.BLOCK_NOT_FOUND_ERROR() })); }
            const delete_block = await prisma.block.delete({ where: { id } })
            if (!delete_block) { return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() })); }
            return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }
}