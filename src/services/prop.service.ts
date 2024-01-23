import { prisma } from "@/libs/prisma";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { PropDto } from "./dto/prop.dto";
import { LogService } from "./log.service";
import { BaseService } from "./base.service";

export class PropService extends BaseService {

    constructor(request?: any) {
        super(request);
    }
    
    async getProp(id: number) {
        const prop = await prisma.prop.findUnique({ where: { id } })
        if (!prop) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
        return new Response(JSON.stringify(prop));
    }

    async getProps() {
        const props = await prisma.prop.findMany()
        if (props.length < 1) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
        return new Response(JSON.stringify(props));
    }

    async createProp(data: PropDto) {
        try {
            const checkType = await prisma.prop.findUnique({ where: { id: data.type.id } })
            if (!checkType) { return new Response(JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() }), { status: 404 }); }
            const prop = await prisma.prop.create({ data: { key: data.key, type_id: data.type.id } })
            if (!prop) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
            return new Response(JSON.stringify(prop));
        }
        catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async updateProp(id: number, data: PropDto) {
        try {

            const prop = await prisma.prop.findUnique({ where: { id } })
            if (!prop) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
            Object.assign(prop, data)
            const checkType = await prisma.prop.findUnique({ where: { id: data.type.id } })
            if (!checkType) { return new Response(JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() }), { status: 404 }); }
            const new_prop = await prisma.prop.update({ where: { id }, data: { key: data.key, type_id: data.type.id } })
            if (!new_prop) { return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }), { status: 400 }); }
            return new Response(JSON.stringify(new_prop));
        }
        catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async deleteProp(id: number) {
        try {
            const prop = await prisma.prop.findUnique({ where: { id } })
            if (!prop) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
            const delete_prop = await prisma.prop.delete({ where: { id } })
            if (!delete_prop) { return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }), { status: 400 }); }
            return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }), { status: 200 });
        }
        catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }
}