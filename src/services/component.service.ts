import { prisma } from "@/libs/prisma";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { ComponentDto } from "./dto/component.dto";

export class ComponentService {
    async getComponent(id: number) {
        const component = await prisma.component.findUnique({ where: { id } })
        if (!component) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
        return new Response(JSON.stringify(component));
    }

    async getComponents() {
        const components = await prisma.component.findMany()
        if (components.length < 1) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
        return new Response(JSON.stringify(components));
    }

    async createComponent(data: ComponentDto) {
        try {
            const component = await prisma.component.create({ data })
            if (!component) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            return new Response(JSON.stringify(component));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async updateComponent(id: number, data: ComponentDto) {
        try {
            const component = await prisma.component.findUnique({ where: { id } })
            if (!component) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            Object.assign(component, data)
            const new_component = await prisma.component.update({ where: { id }, data })
            if (!new_component) { return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() })); }
            return new Response(JSON.stringify(new_component));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async deleteComponent(id: number) {
        try {
            const component = await prisma.component.findUnique({ where: { id } })
            if (!component) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            const delete_component = await prisma.component.delete({ where: { id } })
            if (!delete_component) { return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() })); }
            return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }
}
