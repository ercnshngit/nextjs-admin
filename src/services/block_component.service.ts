import { prisma } from "@/libs/prisma";
import {
  ConfirmMessages,
  ErrorMessages,
} from "../../constants/messages.constants";
import {
  CreateBlockComponentsDto,
  UpdateBlockComponentDto,
} from "./dto/block_component.dto";
import { LogService } from "./log.service";

export class BlockComponentService extends LogService {
  async getBlockComponent(block_id: number) {
    try {
      const blockComponent = await prisma.block_component.findMany({
        where: { block_id },
        include: {
          component: {
            include: {
              tag: true,
              type: true,
            },
          },
          block: true,
          block_component_prop: {
            include: {
              prop: { include: { type: true } },
            },
          },
        },
      });

      const result = blockComponent.map((item) => {
        const block_component_prop = item.block_component_prop.map(
          (propItem) => {
            return { prop: propItem.prop, value: propItem.value };
          }
        );
        return {
          component: item.component,
          block: item.block,
          belong_block_component_code: item.belong_block_component_code,
          depth: item.depth,
          order: item.order,
          code: item.code,
          hasChildren: item.hasChildren,
          props: block_component_prop,
        };
      });

      return new Response(JSON.stringify(result));
    } catch (error) {
      await this.createLog({ error });
    }
  }

  async getBlockComponentBySlug(block_slug: string) {
    try {
      const blockComponent = await prisma.block_component.findMany({
        where: { block: { slug: block_slug } },
        include: {
          component: {
            include: {
              tag: true,
              type: true,
            },
          },
          block: true,
          block_component_prop: {
            include: {
              prop: { include: { type: true } },
            },
          },
        },
      });

      const result = blockComponent.map((item) => {
        const block_component_prop = item.block_component_prop.map(
          (propItem) => {
            return { prop: propItem.prop, value: propItem.value };
          }
        );
        return {
          component: item.component,
          block: item.block,
          belong_block_component_code: item.belong_block_component_code,
          depth: item.depth,
          order: item.order,
          code: item.code,
          hasChildren: item.hasChildren,
          props: block_component_prop,
        };
      });

      return new Response(JSON.stringify(result));
    } catch (error) {
      await this.createLog({ error });

      console.log(error);
    }
  }

  async getBlockComponents() {
    try {
      let components: any = [];
      let props: any = [];
      let result: any = [];
      const blockComponent = await prisma.block_component.findMany();

      for (let i = 0; i < blockComponent.length; i++) {
        const block_component_prop = await prisma.block_component_prop.findMany(
          {
            where: { block_component_id: blockComponent[i].id },
            select: {
              prop: { select: { key: true, type_id: true } },
              value: true,
            },
          }
        );
        await props.push(block_component_prop);

        const component = await prisma.component.findUnique({
          where: { id: blockComponent[i].component_id },
          select: { name: true, tag_id: true, type_id: true, icon: true },
        });
        await components.push(component);

        const block_component = await prisma.block_component.findMany({
          where: { id: blockComponent[i].id },
          select: {
            id: true,
            component_id: true,
            depth: true,
            order: true,
            belong_block_component_code: true,
            block_id: true,
            code: true,
            hasChildren: true,
          },
        });

        const assign: any = Object.assign(block_component[0], component);
        result.concat(assign);
        assign["props"] = block_component_prop;
        await result.push(assign);
      }

      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      await this.createLog({ error });
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async createBlockComponent(data: CreateBlockComponentsDto) {
    try {
      if (data.block_id) {
        await this.deleteBlockComponentByBlockId(data.block_id);
      }

      const results = [];

      for (const item of data.block_components) {
        const data = await this.getOrCreateBlockComponents(
          item.component.tag,
          item.component.type,
          item.block,
          item.component,
          item.code
        );
        if (data instanceof Response) return data;

        const block_component = await prisma.block_component.create({
          data: {
            component_id: data.component.id,
            block_id: data.block.id,
            belong_block_component_code: item.belong_block_component_code,
            depth: item.depth,
            order: item.order,
            code: item.code,
            hasChildren: item.hasChildren,
          },
        });

        const props = await Promise.all(
          item.props.map(async (propItem) => {
            let prop = await prisma.prop.findFirst({
              where: { key: propItem.prop.key },
            });
            if (!prop)
              prop = await prisma.prop.create({
                data: {
                  key: propItem.prop.key,
                  type_id: propItem.prop.type.id,
                },
              });

            await prisma.block_component_prop.create({
              data: {
                block_component_id: block_component.id,
                prop_id: prop.id,
                value: propItem.value,
              },
            });
            return { key: prop.key, value: propItem.value };
          })
        );

        results.push({
          id: data.component.id,
          name: data.component.name,
          tag_id: data.tag.id,
          type_id: data.type.id,
          icon: data.component.icon,
          block_id: data.block.id,
          belong_block_component_code: item.belong_block_component_code,
          depth: item.depth,
          order: item.order,
          code: item.code,
          hasChildren: item.hasChildren,
          props,
        });
      }

      return new Response(JSON.stringify({ results }), { status: 200 });
    } catch (error) {
      await this.createLog({ error });

      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error }),
        { status: 500 }
      );
    }
  }

  async checkBlockComponents(id: number, data: UpdateBlockComponentDto) {
    let check_component: any = "null",
      check_block: any = "null",
      check_belong_component: any = "null",
      msg: any = "";

    const block_component = await prisma.block_component.findUnique({
      where: { id },
    });
    if (!block_component) {
      return new Response(
        JSON.stringify({
          message: ErrorMessages.BLOCK_COMPONENT_NOT_FOUND_ERROR(),
        }),
        { status: 404 }
      );
    }

    Object.assign(block_component, data);

    if (data.component_id != undefined) {
      check_component = await prisma.component.findUnique({
        where: { id: data.component_id },
      });
    }
    if (data.block_id != undefined) {
      check_block = await prisma.block.findUnique({
        where: { id: data.block_id },
      });
    }
    if (data.belong_block_component_code != undefined) {
      check_belong_component = await prisma.block_component.findUnique({
        where: { code: data.belong_block_component_code },
      });
    }
    !check_component
      ? (msg = ErrorMessages.COMPONENT_NOT_FOUND_ERROR().EN)
      : !check_block
      ? (msg = ErrorMessages.BLOCK_COMPONENT_NOT_FOUND_ERROR().en)
      : !check_belong_component
      ? (msg = ErrorMessages.COMPONENT_NOT_FOUND_ERROR().EN)
      : null;

    if (msg) {
      return new Response(JSON.stringify({ message: msg }), { status: 400 });
    }
    return true;
  }

  async getOrCreateBlockComponents(
    tagData: any,
    typeData: any,
    blockData: any,
    componentData: any,
    code: any
  ) {
    let tag = tagData.id
      ? await prisma.tag.findUnique({ where: { id: tagData.id } })
      : await prisma.tag.create({ data: { name: tagData.name } });
    let type = typeData.id
      ? await prisma.type.findUnique({ where: { id: typeData.id } })
      : await prisma.type.create({ data: typeData });
    let block = blockData.id
      ? await prisma.block.findUnique({ where: { id: blockData.id } })
      : await prisma.block.create({ data: blockData });
    if (!tag || !type || !block) {
      console.warn("tag, type, block not found", tag, type, block);
      return new Response(
        JSON.stringify({ message: ErrorMessages.CREATE_FAILED_ERROR() }),
        { status: 400 }
      );
    }
    let component = componentData.id
      ? await prisma.component.findUnique({ where: { id: componentData.id } })
      : await prisma.component.create({
          data: {
            name: componentData.name,
            tag_id: tag.id,
            type_id: type.id,
            icon: componentData.icon,
          },
        });
    if (!component) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.CREATE_FAILED_ERROR() }),
        { status: 400 }
      );
    }
    if (code) {
      const check_code = await prisma.block_component.findFirst({
        where: { code },
      });
      if (check_code) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.DUPLICATE_CODE_ERROR() }),
          { status: 400 }
        );
      }
    }
    return { tag, type, block, component };
  }

  async updateBlockComponent(id: number, data: UpdateBlockComponentDto) {
    try {
      const check = await this.checkBlockComponents(id, data);
      if (check instanceof Response) return check;

      const update = await prisma.block_component.update({
        where: { id },
        data,
      });

      if (!update) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }),
          { status: 400 }
        );
      }
      return new Response(
        JSON.stringify({ message: ConfirmMessages.UPDATE_SUCCESS_CONFIRM() }),
        { status: 200 }
      );
    } catch (error) {
      await this.createLog({ error });

      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error }),
        { status: 500 }
      );
    }
  }

  async deleteBlockComponentByBlockId(block_id: number) {
    // Deletes all "block components" and "children" connected to the "block id"
    try {
      const block_component = await prisma.block_component.findMany({
        where: { block_id },
      });
      if (!block_component) {
        return new Response(
          JSON.stringify({
            message: ErrorMessages.BLOCK_COMPONENT_NOT_FOUND_ERROR(),
          }),
          { status: 404 }
        );
      }
      for (let i = 0; i < block_component.length; i++) {
        const delete_block_component_props =
          await prisma.block_component_prop.deleteMany({
            where: { block_component_id: block_component[i].id },
          });
        if (!delete_block_component_props) {
          return new Response(
            JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }),
            { status: 400 }
          );
        }
        const delete_block_component = await prisma.block_component.delete({
          where: { id: block_component[i].id },
        });
        if (!delete_block_component) {
          return new Response(
            JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }),
            { status: 400 }
          );
        }
      }
      return new Response(
        JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }),
        { status: 200 }
      );
    } catch (error) {
      await this.createLog({ error });

      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error }),
        { status: 500 }
      );
    }
  }

  async deleteBlockComponent(id: number) {
    // Deletes all "block components" and "children" connected to the "block component id"
    try {
      const block_component = await prisma.block_component.findUnique({
        where: { id },
      });
      if (!block_component) {
        return new Response(
          JSON.stringify({
            message: ErrorMessages.BLOCK_COMPONENT_NOT_FOUND_ERROR(),
          }),
          { status: 404 }
        );
      }
      const delete_block_component_props =
        await prisma.block_component_prop.deleteMany({
          where: { block_component_id: id },
        });
      if (!delete_block_component_props) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }),
          { status: 400 }
        );
      }
      const delete_block_component = await prisma.block_component.delete({
        where: { id },
      });
      if (!delete_block_component) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }),
          { status: 400 }
        );
      }
      return new Response(
        JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }),
        { status: 200 }
      );
    } catch (error) {
      await this.createLog({ error });
      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error }),
        { status: 500 }
      );
    }
  }
}
