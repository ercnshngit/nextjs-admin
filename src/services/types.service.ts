import { prisma } from "@/libs/prisma";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { TypesDto } from "./dto/types.dto";

export class TypesService {
    async getType(id: number) {
        const type = await prisma.types.findUnique({ where: { id } })
        if (!type) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
        return new Response(JSON.stringify(type));
    }

    async getTypes() {
        const types = await prisma.types.findMany()
        if (types.length < 1) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
        return new Response(JSON.stringify(types));
    }

    async createType(data: TypesDto) {
        try {
            const type = await prisma.types.create({ data })
            if (!type) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            return new Response(JSON.stringify(type));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async updateType(id: number, data: TypesDto) {
        try {
            const type = await prisma.types.findUnique({ where: { id } })
            if (!type) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            Object.assign(type, data)
            const new_type = await prisma.types.update({ where: { id }, data })
            if (!new_type) { return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() })); }
            return new Response(JSON.stringify(new_type));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async deleteType(id: number) {
        try {
            const type = await prisma.types.findUnique({ where: { id } })
            if (!type) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            const delete_type = await prisma.types.delete({ where: { id } })
            if (!delete_type) { return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() })); }
            return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }
}