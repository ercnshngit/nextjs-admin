import { prisma } from "@/libs/prisma";
import {
  ConfirmMessages,
  ErrorMessages,
} from "../../constants/messages.constants";
import { ComponentDto, CreateComponentDto } from "./dto/component.dto";
import { LogService } from "./log.service";

export class ComponentService extends LogService {
  async getComponent(id: number) {
    const component = await prisma.component.findUnique({
      where: { id },
      include: {
        type: true,
        tag: true,
        component_prop: { include: { prop: { include: { type: true } } } },
      },
    });
    if (!component) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }
    const result = {
      ...component,
      props: component.component_prop.map((component_prop) => {
        return component_prop.prop;
      }),
      component_prop: undefined,
      type_id: undefined,
      tag_id: undefined,
    };
    return new Response(JSON.stringify(result));
  }

  async getComponents() {
    const components = await prisma.component.findMany({
      include: {
        type: true,
        tag: true,
        component_prop: { include: { prop: { include: { type: true } } } },
      },
    });
    if (components.length < 1) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
        { status: 404 }
      );
    }
    const result: ComponentDto[] | {} = components.map((component) => {
      return {
        ...component,
        props: component.component_prop.map((component_prop) => {
          return component_prop.prop;
        }),
        component_prop: undefined,
        type_id: undefined,
        tag_id: undefined,
      };
    });
    return new Response(JSON.stringify(result));
  }

  async createComponent(data: CreateComponentDto) {
    try {
      let tag = await prisma.tag.findFirst({ where: { name: data.tag.name } });
      if (!tag) {
        tag = await prisma.tag.create({ data: { name: data.tag.name } });
      }

      const typeCheck = await prisma.type.findUnique({
        where: { id: data.type_id },
      });
      if (!typeCheck) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      const component = await prisma.component.create({
        data: {
          name: data.name,
          tag_id: tag.id,
          type_id: data.type_id,
          icon: data.icon,
        },
        include: { tag: true },
      });
      if (!component) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.CREATE_FAILED_ERROR() }),
          { status: 400 }
        );
      }

      const props = await Promise.all(
        data.props.map(async (propItem) => {
          let prop = await prisma.prop.findFirst({
            where: { key: propItem.prop.key },
          });
          if (!prop) {
            let type = await prisma.type.findFirst({
              where: { name: propItem.prop.type.name },
            });
            if (!type) {
              type = await prisma.type.create({
                data: {
                  name: propItem.prop.type.name,
                  table_id: propItem.prop.type.table_id,
                },
              });
            }

            prop = await prisma.prop.create({
              data: {
                key: propItem.prop.key,
                type_id: type.id,
              },
            });
          }

          await prisma.component_prop.create({
            data: {
              component_id: component.id,
              prop_id: prop.id,
            },
          });
          return { key: prop.key };
        })
      );
      const { tag_id, ...result } = component;
      const results = { ...result, props };

      return new Response(JSON.stringify(results));
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error })
      );
    }
  }

  async updateComponent(id: number, data: CreateComponentDto) {
    try {
      const component = await prisma.component.findUnique({ where: { id } });
      if (!component) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      Object.assign(component, data);
      const new_component = await prisma.component.update({
        where: { id },
        data: {
          name: data.name,
          tag_id: data.tag.id,
          type_id: data.type_id,
          icon: data.icon,
        },
      });
      if (!new_component) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }),
          { status: 400 }
        );
      }
      return new Response(JSON.stringify(new_component));
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error })
      );
    }
  }

  async deleteComponent(id: number) {
    try {
      const component = await prisma.component.findUnique({ where: { id } });
      if (!component) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      const delete_component = await prisma.component.delete({ where: { id } });
      if (!delete_component) {
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
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error })
      );
    }
  }
}
