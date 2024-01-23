import { prisma } from "@/libs/prisma";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { TypeDto } from "./dto/type.dto";
import { LogService } from "./log.service";
import { BaseService } from "./base.service";

export class TypeService extends BaseService{
    constructor(request?: any) {
        super(request);
    }
    async getType(id: number) {
        const type = await prisma.type.findUnique({ where: { id } })
        if (!type) {
            return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 });
        }
        return new Response(JSON.stringify(type), { status: 200 });
    }

    async getTypes() {
        const types = await prisma.type.findMany()
        if (types.length < 1) {
            return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 });
        }
        return new Response(JSON.stringify(types), { status: 200 });
    }

    async createType(data: TypeDto) {
        try {
            const type = await prisma.type.create({ data })
            if (!type) {
                return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 });
            }
            return new Response(JSON.stringify(type), { status: 200 });
        }
        catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }), { status: 500 });
        }
    }

    async updateType(id: number, data: TypeDto) {
        try {
            const type = await prisma.type.findUnique({ where: { id } })
            if (!type) {
                return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 });
            }
            Object.assign(type, data)
            const new_type = await prisma.type.update({ where: { id }, data })
            if (!new_type) {
                return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }), { status: 400 });
            }
            return new Response(JSON.stringify(new_type), { status: 200 });
        }
        catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }), { status: 500 });
        }
    }

    async deleteType(id: number) {
        try {
            const type = await prisma.type.findUnique({ where: { id } })
            if (!type) {
                return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 });
            }
            const delete_type = await prisma.type.delete({ where: { id } })
            if (!delete_type) {
                return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }), { status: 400 });
            }
            return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }), { status: 200 });
        }
        catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }), { status: 500 });
        }
    }
}