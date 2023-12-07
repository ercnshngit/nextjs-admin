import { prisma } from "@/libs/prisma";
import { BlockDto } from "@/services/dto/block.dto";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";

export class ComponentPropService {
    async getComponentProp(id: number) {
        const component_prop = await prisma.component_prop.findUnique({ where: { id } })
        if (!component_prop) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
        return new Response(JSON.stringify(component_prop));
    }

    async getComponentProps() {
        const component_props = await prisma.component_prop.findMany()
        if (component_props.length < 1) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
        return new Response(JSON.stringify(component_props));
    }

    async createComponentProp(data: BlockDto) {
        try {
            const checkType = await prisma.component_prop.findUnique({ where: { id: data.type_id } })
            if (!checkType) { return new Response(JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() })); }
            const component_prop = await prisma.block.create({ data })
            if (!component_prop) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            return new Response(JSON.stringify(component_prop));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async updateComponentProp(id: number, data: BlockDto) {
        try {
            if (data.type_id) {
                const checkType = await prisma.component_prop.findUnique({ where: { id: data.type_id } })
                if (!checkType) { return new Response(JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() })); }
            }
            const component_prop = await prisma.block.findUnique({ where: { id } })
            if (!component_prop) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            Object.assign(component_prop, data)
            const new_component_prop = await prisma.block.update({ where: { id }, data })
            if (!new_component_prop) { return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() })); }
            return new Response(JSON.stringify(new_component_prop));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async deleteComponentProp(id: number) {
        try {
            const component_prop = await prisma.block.findUnique({ where: { id } })
            if (!component_prop) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            const delete_component_prop = await prisma.block.delete({ where: { id } })
            if (!delete_component_prop) { return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() })); }
            return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }
}