import { prisma } from "@/libs/prisma";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { BlockComponentDto, CreateBlockComponentDto, UpdateBlockComponentDto } from "./dto/block_component.dto";

export class BlockComponentService {
    async getBlockComponent(id: number) {
        try {
            let components: any = []; let props: any = []; let result: any = [];
            const blockComponent = await prisma.block_component.findMany({ where: { id } });

            for (let i = 0; i < blockComponent.length; i++) {
                const block_component_prop = await prisma.block_component_prop.findMany({ where: { block_component_id: blockComponent[i].id }, select: { prop: { select: { key: true, type_id: true } }, value: true } });
                await props.push(block_component_prop);

                const component = await prisma.component.findUnique({ where: { id: blockComponent[i].component_id } });
                await components.push(component);

                const block_component = await prisma.block_component.findMany({ where: { id: blockComponent[i].id }, select: { id: true, component_id: true, depth: true, order: true, belong_component_id: true, block_id: true, code: true, hasChildren: true } });

                const assign: any = Object.assign(block_component[0], component);
                result.concat(assign);
                assign["props"] = block_component_prop;
                await result.push(assign);
            }

            return new Response(JSON.stringify(result));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async getBlockComponents() {
        try {
            let components: any = []; let props: any = []; let result: any = [];
            const blockComponent = await prisma.block_component.findMany();

            for (let i = 0; i < blockComponent.length; i++) {
                const block_component_prop = await prisma.block_component_prop.findMany({ where: { block_component_id: blockComponent[i].id }, select: { prop: { select: { key: true, type_id: true } }, value: true } });
                await props.push(block_component_prop);

                const component = await prisma.component.findUnique({ where: { id: blockComponent[i].component_id }, select: { name: true, tag_id: true, type_id: true, icon: true } });
                await components.push(component);

                const block_component = await prisma.block_component.findMany({ where: { id: blockComponent[i].id }, select: { id: true, component_id: true, depth: true, order: true, belong_component_id: true, block_id: true, code: true, hasChildren: true } });

                const assign: any = Object.assign(block_component[0], component);
                result.concat(assign);
                assign["props"] = block_component_prop;
                await result.push(assign);
            }

            return new Response(JSON.stringify(result));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async createBlockComponent(data: CreateBlockComponentDto) {
        try {
            let results: any = [];
            for (let i = 0; i < data.block_components.length; i++) {
                const msg = await this.checkBlockComponents(data.block_components[i], 'create')
                if (msg) { return new Response(JSON.stringify({ message: msg })); }
                const component = await prisma.component.create({
                    data: {
                        name: data.block_components[i].component.name,
                        tag_id: data.block_components[i].component.tag_id,
                        type_id: data.block_components[i].component.type_id,
                        icon: data.block_components[i].component.icon
                    }
                })

                let block = data.block_components[i].block;
                if (data.block_components[i].block.id && !(await prisma.block.findUnique({ where: { id: data.block_components[i].block.id } })) || !data.block_components[i].block.id) {
                    block = await prisma.block.create({
                        data: {
                            title: data.block_components[i].block.title,
                            type_id: data.block_components[i].block.type_id,
                        }
                    })
                }

                const block_component = await prisma.block_component.create({
                    data: {
                        component_id: component.id,
                        block_id: block.id,
                        belong_component_id: data.block_components[i].belong_component_id,
                        depth: data.block_components[i].depth,
                        order: data.block_components[i].order,
                        code: data.block_components[i].code,
                        hasChildren: data.block_components[i].hasChildren
                    }
                })

                let props: any = [];
                if (data.block_components[i]) {
                    for (let j = 0; j < (data.block_components[i].props as any[]).length; j++) {
                        const prop = await prisma.prop.create({
                            data: {
                                key: data.block_components[i].props[j].prop.key,
                                type_id: data.block_components[i].props[j].prop.type_id
                            }
                        })
                        props.push(prop);
                        await prisma.block_component_prop.create({
                            data: {
                                prop_id: prop.id,
                                block_component_id: block_component.id,
                                value: data.block_components[i].props[j].value
                            }
                        })
                    }
                }

                const result = {
                    id: block_component.id,
                    name: component.name,
                    tag_id: component.tag_id,
                    type_id: component.type_id,
                    icon: component.icon,
                    depth: block_component.depth,
                    order: block_component.order,
                    belong_component_id: block_component.belong_component_id,
                    block_id: block_component.block_id,
                    code: block_component.code,
                    hasChildren: block_component.hasChildren,
                    props
                }
                results.push(result)
            }

            return new Response(JSON.stringify(results));
        }

        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async updateBlockComponent(id: number, data: UpdateBlockComponentDto) {
        try {
            let msg: any = '';
            let check_component: any = 'null', check_block: any = 'null', check_belong_component: any = 'null';
            const block_component = await prisma.block_component.findUnique({ where: { id } })
            if (!block_component) { return new Response(JSON.stringify({ message: ErrorMessages.BLOCK_COMPONENT_NOT_FOUND_ERROR() })); }

            Object.assign(block_component, data);

            if (data.component_id != undefined) { check_component = await prisma.component.findUnique({ where: { id: data.component_id } }) }
            if (data.block_id != undefined) { check_block = await prisma.block.findUnique({ where: { id: data.block_id } }) }
            if (data.belong_component_id != undefined) { check_belong_component = await prisma.component.findUnique({ where: { id: data.belong_component_id } }) }
            !check_component ? msg = ErrorMessages.COMPONENT_NOT_FOUND_ERROR().EN :
                !check_block ? msg = ErrorMessages.BLOCK_NOT_FOUND_ERROR().en :
                    !check_belong_component ? msg = ErrorMessages.COMPONENT_NOT_FOUND_ERROR().EN : null

            if (msg) { return new Response(JSON.stringify({ message: msg })); }
            const update = await prisma.block_component.update({ where: { id }, data })
            if (!update) { return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() })); }

            return new Response(JSON.stringify({ message: ConfirmMessages.UPDATE_SUCCESS_CONFIRM() }));


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
            const delete_block_component_props = await prisma.block_component_prop.deleteMany({ where: { block_component_id: id } })
            if (!delete_block_component_props) { return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() })); }
            const delete_block_component = await prisma.block_component.delete({ where: { id } })
            if (!delete_block_component) { return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() })); }
            return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async checkBlockComponents(data: BlockComponentDto, code?: string) {
        let msg = '';
        let checkComponent: any = 'null', checkBelongComponent: any = 'null';

        if (code == undefined && data.component.id != undefined) { checkComponent = await prisma.component.findUnique({ where: { id: data.component.id } }) }
        if (data.belong_component_id != undefined) { checkBelongComponent = await prisma.component.findUnique({ where: { id: data.belong_component_id } }) }

        !checkComponent ? msg = ErrorMessages.COMPONENT_NOT_FOUND_ERROR().EN :
            !checkBelongComponent ? msg = ErrorMessages.COMPONENT_NOT_FOUND_ERROR().EN : null
        if (msg) { return msg }
        return null
    }
}