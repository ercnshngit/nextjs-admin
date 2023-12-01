import { prisma } from "@/libs/prisma";
import { BlockDto } from "@/services/dto/block.dto";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { BlockComponentDto } from "./dto/block_component.dto";

export class BlockComponentService {
    async getBlockComponent(id: number) {
        const block_component = await prisma.block_component.findUnique({ where: { id } })
        if (!block_component) { return new Response(JSON.stringify({ message: ErrorMessages.BLOCK_NOT_FOUND_ERROR() })); }
        return new Response(JSON.stringify(block_component));
    }

    async getBlockComponents() {
        const block_components = await prisma.block_component.findMany()
        if (block_components.length < 1) { return new Response(JSON.stringify({ message: ErrorMessages.BLOCK_NOT_FOUND_ERROR() })); }
        return new Response(JSON.stringify(block_components));
    }

    async createBlockComponent(data: BlockComponentDto) {
        try {
            const msg = await this.checkBlockComponent(data)
            if (msg) { return new Response(JSON.stringify({ message: msg })); }
            const block_component = await prisma.block_component.create({ data })
            if (!block_component) { return new Response(JSON.stringify({ message: ErrorMessages.BLOCK_NOT_FOUND_ERROR() })); }
            return new Response(JSON.stringify(block_component));
        }

        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async updateBlockComponent(id: number, data: BlockComponentDto) {
        try {
            console.log('girdimm miiii')
            const msg = await this.checkBlockComponent(data)
            if (msg) { return new Response(JSON.stringify({ message: msg })); }
            const block_component = await prisma.block_component.findUnique({ where: { id } })
            if (!block_component) { return new Response(JSON.stringify({ message: ErrorMessages.BLOCK_COMPONENT_NOT_FOUND_ERROR() })); }
            Object.assign(block_component, data)
            const new_block_component = await prisma.block_component.update({ where: { id }, data })
            if (!new_block_component) { return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() })); }
            return new Response(JSON.stringify(new_block_component));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async deleteBlockComponent(id: number) {
        try {
            const block_component = await prisma.block_component.findUnique({ where: { id } })
            if (!block_component) { return new Response(JSON.stringify({ message: ErrorMessages.BLOCK_NOT_FOUND_ERROR() })); }
            const delete_block_component = await prisma.block_component.delete({ where: { id } })
            if (!delete_block_component) { return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() })); }
            return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async checkBlockComponent(data: BlockComponentDto) {
        let msg = '';
        const checkBlock = await prisma.block.findUnique({ where: { id: data.block_id } })
        const checkComponent = await prisma.component.findUnique({ where: { id: data.component_id } })
        if (data.belong_component_id) {
            const checkBelongComponent = await prisma.component.findUnique({ where: { id: data.belong_component_id } })
            checkBelongComponent ? null :
                msg = ErrorMessages.COMPONENT_NOT_FOUND_ERROR().EN
            console.log(msg)
        }
        !checkBlock ? msg = ErrorMessages.BLOCK_NOT_FOUND_ERROR().en : !checkComponent ? msg = ErrorMessages.COMPONENT_NOT_FOUND_ERROR().EN : null
        if (msg) { return msg }
        else { return null }
    }
}