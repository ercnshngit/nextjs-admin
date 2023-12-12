import { prisma } from "@/libs/prisma";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { CreateComponentDto } from "./dto/component.dto";

export class ComponentService {
    async getComponent(id: number) {
        const component = await prisma.component.findUnique({ where: { id }, include: { type: true, tag: true, component_prop: { include: { prop: true } } } })
        if (!component) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
        return new Response(JSON.stringify(component));
    }

    async getComponents() {
        const components = await prisma.component.findMany({ include: { type: true, tag: true, component_prop: { include: { prop: true } } } });
        if (components.length < 1) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
        return new Response(JSON.stringify(components));
    }

    async createComponent(data: CreateComponentDto) {
        try {
            const tag = await prisma.tag.create({ data: data.tag })
            const typeCheck = await prisma.type.findUnique({ where: { id: data.type_id } })
            if (!typeCheck) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
            const component = await prisma.component.create({ data: { name: data.name, tag_id: tag.id, type_id: data.type_id, icon: data.icon } })
            if (!component) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
            const props = await Promise.all(
                data.props.map(async (propItem) => {
                    let prop = await prisma.prop.findFirst({
                        where: { key: propItem.prop.key },
                    });
                    if (!prop)
                        prop = await prisma.prop.create({
                            data: {
                                key: propItem.prop.key,
                                type_id: propItem.prop.type_id,
                            },
                        });

                    await prisma.component_prop.create({
                        data: {
                            component_id: component.id,
                            prop_id: prop.id,
                        },
                    });
                    return { key: prop.key, value: propItem.value };
                })
            );

            const result = { ...component, props };

            return new Response(JSON.stringify(result));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async updateComponent(id: number, data: CreateComponentDto) {
        try {
            const component = await prisma.component.findUnique({ where: { id } })
            if (!component) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
            Object.assign(component, data)
            const new_component = await prisma.component.update({ where: { id }, data: { name: data.name, tag_id: data.tag.id, type_id: data.type_id, icon: data.icon } })
            if (!new_component) { return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }), { status: 400 }); }
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
            if (!component) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
            const delete_component = await prisma.component.delete({ where: { id } })
            if (!delete_component) { return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }), { status: 400 }); }
            return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }), { status: 200 });
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }
}
