import { prisma } from "@/libs/prisma";

export class ComponentService {


    async getBlockComponent(id: number) {
        try {
            let components: any = []; let props: any = []; let result: any = [];
            const blockComponent = await prisma.block_component.findMany({ where: { id } });

            for (let i = 0; i < blockComponent.length; i++) {
                const block_component_prop = await prisma.block_component_prop.findMany({ where: { block_component_id: blockComponent[i].id }, select: { prop: { select: { key: true } }, value: true } });
                await props.push(block_component_prop);

                const component = await prisma.component.findMany({ where: { id: blockComponent[i].component_id } });
                await components.push(component);

                const block_component = await prisma.block_component.findUnique({ where: { id: blockComponent[i].id }, select: { depth: true, order: true, belong_component_id: true, block_id: true } });

                const assign: any = Object.assign(component[0], block_component);
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
                const block_component_prop = await prisma.block_component_prop.findMany({ where: { block_component_id: blockComponent[i].id }, select: { prop: { select: { key: true } }, value: true } });
                await props.push(block_component_prop);

                const component = await prisma.component.findMany({ where: { id: blockComponent[i].component_id } });
                await components.push(component);

                const block_component = await prisma.block_component.findUnique({ where: { id: blockComponent[i].id }, select: { depth: true, order: true, belong_component_id: true, block_id: true } });
                const assign: any = Object.assign(component[0], block_component);
                result.concat(assign);
                assign["props"] = block_component_prop;
                await result.push(assign);
            }

            return new Response(JSON.stringify(result));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async createBlockComponent(body: any) {
        try {
            const { component_id, block_id, depth, order, belong_component_id } = body;
            const blockComponent = await prisma.block_component.create({ data: { component_id, block_id, depth, order, belong_component_id } });
            return new Response(JSON.stringify(blockComponent));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }
}