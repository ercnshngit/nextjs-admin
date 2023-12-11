import { prisma } from "@/libs/prisma";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { BlockComponentDto, CreateBlockComponentDto, CreateBlockComponentsDto, UpdateBlockComponentDto } from "./dto/block_component.dto";

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

            return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
        }
    }

    async createBlockComponent(data: CreateBlockComponentsDto) {
        try {
            let results: any = []; let tag: any = null; let type: any = null; let prop: any = null; let component: any = null;
            let block: any = null;
            for (let i = 0; i < data.block_components.length; i++) {
                if (data.block_components[i].component.tag.id && !(await prisma.tag.findUnique({ where: { id: data.block_components[i].component.tag.id } })) || !data.block_components[i].component.tag.id) {
                    tag = await prisma.tag.create({ data: data.block_components[i].component.tag })
                }
                if (data.block_components[i].component.tag.id) {
                    tag = await prisma.block.findUnique({ where: { id: data.block_components[i].component.tag.id } })
                }

                if ((data.block_components[i].component.type.id && !(await prisma.types.findUnique({ where: { id: data.block_components[i].component.type.id } }))) || !data.block_components[i].component.type.id) {
                    type = await prisma.types.create({ data: data.block_components[i].component.type })
                }
                if (data.block_components[i].component.type.id) {
                    type = await prisma.block.findUnique({ where: { id: data.block_components[i].component.type.id } })
                }

                if (data.block_components[i].block.id && !(await prisma.block.findUnique({ where: { id: data.block_components[i].block.id } })) || !data.block_components[i].block.id) {
                    block = await prisma.block.create({ data: data.block_components[i].block })
                }
                if (data.block_components[i].block.id) {
                    block = await prisma.block.findUnique({ where: { id: data.block_components[i].block.id } })
                }

                if (!data.block_components[i].component.id) {
                    component = await prisma.component.create({
                        data: {
                            name: data.block_components[i].component.name,
                            tag_id: tag.id,
                            type_id: type.id,
                            icon: data.block_components[i].component.icon
                        }
                    })
                    if (!component) {
                        return new Response(JSON.stringify({ message: ErrorMessages.CREATE_FAILED_ERROR() }), { status: 400 });
                    }
                }
                else if (data.block_components[i].component.id) {
                    component = await prisma.component.update({
                        where: { id: data.block_components[i].component.id },
                        data: {
                            name: data.block_components[i].component.name,
                            tag_id: tag.id,
                            type_id: type.id,
                            icon: data.block_components[i].component.icon
                        }
                    })
                    if (!component) {
                        return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }), { status: 400 });
                    }
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
                for (let j = 0; j < data.block_components[i].props.length; j++) {
                    const new_prop = await prisma.prop.findFirst({ where: { key: data.block_components[i].props[j].prop.key } })
                    if (!new_prop) {
                        prop = await prisma.prop.create({ data: { key: data.block_components[i].props[j].prop.key, type_id: data.block_components[i].props[j].prop.type_id } })
                    }
                    else {
                        prop = new_prop
                    }

                    props.push({ key: prop.key, value: data.block_components[i].props[j].value })
                    await prisma.block_component_prop.create({ data: { block_component_id: block_component.id, prop_id: prop.id, value: data.block_components[i].props[j].value } })
                }
                let result = {
                    id: component.id,
                    name: component.name,
                    tag_id: tag.id,
                    type_id: type.id,
                    icon: component.icon,
                    block_id: block.id,
                    belong_component_id: data.block_components[i].belong_component_id,
                    depth: data.block_components[i].depth,
                    order: data.block_components[i].order,
                    code: data.block_components[i].code,
                    hasChildren: data.block_components[i].hasChildren,
                    props
                }

                results.push(result)
            }
            return new Response(JSON.stringify({ results }), { status: 200 });
        }

        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }), { status: 500 });
        }
    }

    async updateBlockComponent(id: number, data: UpdateBlockComponentDto) {
        try {
            let msg: any = '';
            let check_component: any = 'null', check_block: any = 'null', check_belong_component: any = 'null';
            const block_component = await prisma.block_component.findUnique({ where: { id } })
            if (!block_component) {
                return new Response(JSON.stringify({ message: ErrorMessages.BLOCK_COMPONENT_NOT_FOUND_ERROR() }), { status: 404 });
            }

            Object.assign(block_component, data);

            if (data.component_id != undefined) {
                check_component = await prisma.component.findUnique({ where: { id: data.component_id } })
            }
            if (data.block_id != undefined) {
                check_block = await prisma.block.findUnique({ where: { id: data.block_id } })
            }
            if (data.belong_component_id != undefined) {
                check_belong_component = await prisma.component.findUnique({ where: { id: data.belong_component_id } })
            }
            !check_component ? msg = ErrorMessages.COMPONENT_NOT_FOUND_ERROR().EN :
                !check_block ? msg = ErrorMessages.BLOCK_NOT_FOUND_ERROR().en :
                    !check_belong_component ? msg = ErrorMessages.COMPONENT_NOT_FOUND_ERROR().EN : null

            if (msg) {
                return new Response(JSON.stringify({ message: msg }), { status: 400 });
            }
            const update = await prisma.block_component.update({ where: { id }, data })
            if (!update) {
                return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }), { status: 400 });
            }
            return new Response(JSON.stringify({ message: ConfirmMessages.UPDATE_SUCCESS_CONFIRM() }), { status: 200 });
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }), { status: 500 });
        }
    }

    async deleteBlockComponent(id: number) {
        try {
            const block_component = await prisma.block_component.findUnique({ where: { id } })
            if (!block_component) {
                return new Response(JSON.stringify({ message: ErrorMessages.BLOCK_NOT_FOUND_ERROR() }), { status: 404 });
            }
            const delete_block_component_props = await prisma.block_component_prop.deleteMany({ where: { block_component_id: id } })
            if (!delete_block_component_props) {
                return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }), { status: 400 });
            }
            const delete_block_component = await prisma.block_component.delete({ where: { id } })
            if (!delete_block_component) {
                return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }), { status: 400 });
            }
            return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }), { status: 200 });
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }), { status: 500 });
        }
    }

    /*async checkBlockComponents(data: BlockComponentDto, code?: string) {
        let msg = '';
        let checkComponent: any = 'null', checkBelongComponent: any = 'null', checkBlock: any = 'null';

        if (code == undefined && data.component.id != undefined) {
            checkComponent = await prisma.component.findUnique({ where: { id: data.component.id } })
        }
        if (data.belong_component_id != undefined) {
            checkBelongComponent = await prisma.component.findUnique({ where: { id: data.belong_component_id } })
        }
        if (data.block) {
            if (data.block.id != undefined) {
                checkBlock = await prisma.block.findUnique({ where: { id: data.block.id } });
                if (!checkBlock) {
                    msg = ErrorMessages.BLOCK_NOT_FOUND_ERROR().en
                }
            }
        }
        !checkComponent ? msg = ErrorMessages.COMPONENT_NOT_FOUND_ERROR().EN :
            !checkBelongComponent ? msg = ErrorMessages.COMPONENT_NOT_FOUND_ERROR().EN : null
        if (msg) {
            return msg
        }
        return null
    }*/
}