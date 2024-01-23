import { prisma } from "@/libs/prisma";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { CreateComponentPropDto } from "./dto/prop.dto";
import { LogService } from "./log.service";
import { BaseService } from "./base.service";

export class ComponentPropService extends BaseService{
    constructor(request?: any) {
        super(request);
    }
    
    async getComponentProp(id: number) {
        const component_prop = await prisma.component_prop.findUnique({ where: { id } })
        if (!component_prop) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
        return new Response(JSON.stringify(component_prop));
    }

    async getComponentProps() {
        const component_props = await prisma.component_prop.findMany()
        if (component_props.length < 1) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
        return new Response(JSON.stringify(component_props));
    }

    async createComponentProp(data: CreateComponentPropDto) {
        try {
            const component_prop = await prisma.component_prop.create({ data })
            if (!component_prop) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
            return new Response(JSON.stringify(component_prop));
        }
        catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async updateComponentProp(id: number, data: CreateComponentPropDto) {
        try {
            const component_prop = await prisma.component_prop.findUnique({ where: { id } })
            if (!component_prop) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
            Object.assign(component_prop, data)
            const new_component_prop = await prisma.component_prop.update({ where: { id }, data })
            if (!new_component_prop) { return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }), { status: 400 }); }
            return new Response(JSON.stringify(new_component_prop));
        }
        catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async deleteComponentProp(id: number) {
        try {
            const component_prop = await prisma.component_prop.findUnique({ where: { id } })
            if (!component_prop) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
            const delete_component_prop = await prisma.component_prop.delete({ where: { id } })
            if (!delete_component_prop) { return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }), { status: 400 }); }
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