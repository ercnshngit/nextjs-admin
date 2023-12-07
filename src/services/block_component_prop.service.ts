import { prisma } from "@/libs/prisma";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { BlockComponentPropDto } from "./dto/block_component_prop.dto";

export class BlockComponentPropService {
    async getBlockComponentProp(id: number) {
        const blockComponentProp = await prisma.block_component_prop.findUnique({ where: { id } })
        if (!blockComponentProp) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
        return new Response(JSON.stringify(blockComponentProp));
    }

    async getBlockComponentProps() {
        const blockComponentProps = await prisma.block_component_prop.findMany()
        if (blockComponentProps.length < 1) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
        return new Response(JSON.stringify(blockComponentProps));
    }

    async createBlockComponentProp(data: BlockComponentPropDto) {
        try {
            const blockComponentProp = await prisma.block_component_prop.create({ data })
            if (!blockComponentProp) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            return new Response(JSON.stringify(blockComponentProp));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async updateBlockComponentProp(id: number, data: BlockComponentPropDto) {
        try {
            const blockComponentProp = await prisma.block_component_prop.findUnique({ where: { id } })
            if (!blockComponentProp) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            Object.assign(blockComponentProp, data)
            const new_blockComponentProp = await prisma.block_component_prop.update({ where: { id }, data })
            if (!new_blockComponentProp) { return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() })); }
            return new Response(JSON.stringify(new_blockComponentProp));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async deleteBlockComponentProp(id: number) {
        try {
            const blockComponentProp = await prisma.block_component_prop.findUnique({ where: { id } })
            if (!blockComponentProp) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            const delete_blockComponentProp = await prisma.block_component_prop.delete({ where: { id } })
            if (!delete_blockComponentProp) { return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() })); }
            return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }
}
