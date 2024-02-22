import { prisma } from "@/libs/prisma";
import {
  ConfirmMessages,
  ErrorMessages,
} from "../../constants/messages.constants";
import { ComponentDto, CreateComponentDto } from "./dto/component.dto";
import { LogService } from "./log.service";
import { BaseService } from "./base.service";

export class ComponentService extends BaseService {
  constructor(request?: any) {
    super(request);
  }

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
      const componentTable = await prisma.database_table.findFirst({
        where: { name: "component" },
      });
      const propTable = await prisma.database_table.findFirst({
        where: { name: "prop" },
      });
      if (!componentTable || !propTable)
        return new Response(
          JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
          { status: 404 }
        );

      let typeCheck = await prisma.type.findFirst({
        where: { name: data.type.name, table_id: componentTable.id },
      });
      if (!typeCheck) {
        typeCheck = await prisma.type.create({
          data: {
            name: data.type.name,
            table_id: componentTable.id,
          },
        });
      }

      let componentCheck = await prisma.component.findFirst({
        where: { name: data.name },
      });
      if (componentCheck) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.ALREADY_EXISTS_ERROR() }),
          { status: 400 }
        );
      }

      const component = await prisma.component.create({
        data: {
          name: data.name,
          tag_id: tag.id,
          type_id: typeCheck.id,
          icon: data.icon,
        },
        include: { tag: true },
      });

      const props = await Promise.all(
        data.props.map(async (propItem) => {
          let propType = await prisma.type.findFirst({
            where: { name: propItem.prop.type.name, table_id: propTable.id },
          });
          if (!propType) {
            propType = await prisma.type.create({
              data: {
                name: propItem.prop.type.name,
                table_id: propTable.id,
              },
            });
          }

          let prop = await prisma.prop.findFirst({
            where: { key: propItem.prop.key, type_id: propType.id },
          });
          if (!prop) {
            let type = await prisma.type.findFirst({
              where: { name: propItem.prop.type.name, table_id: propTable.id },
            });
            if (!type) {
              type = await prisma.type.create({
                data: {
                  name: propItem.prop.type.name,
                  table_id: propTable.id,
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
        JSON.stringify({ status: "error", error_message: error }),
        { status: 400 }
      );
    }
  }

  async updateComponent(id: number, data: CreateComponentDto) {
    try {
      console.log(data.tag);
      let tag = await prisma.tag.findFirst({ where: { name: data.tag.name } });

      if (!tag) {
        tag = await prisma.tag.create({ data: { name: data.tag.name } });
      }
      const component = await prisma.component.findUnique({ where: { id } });
      if (!component) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      const componentTable = await prisma.database_table.findFirst({
        where: { name: "component" },
      });
      const propTable = await prisma.database_table.findFirst({
        where: { name: "prop" },
      });
      if (!componentTable || !propTable)
        return new Response(
          JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      let typeCheck = await prisma.type.findFirst({
        where: { name: data.type.name, table_id: componentTable.id },
      });
      if (!typeCheck) {
        typeCheck = await prisma.type.create({
          data: {
            name: data.type.name,
            table_id: componentTable.id,
          },
        });
      }
      Object.assign(component, data);
      const new_component = await prisma.component.update({
        where: { id },
        data: {
          name: data.name,
          tag_id: tag.id,
          type_id: typeCheck.id,
          icon: data.icon,
        },
      });
      if (!new_component) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }),
          { status: 400 }
        );
      }

      await prisma.component_prop.deleteMany({
        where: { component_id: id },
      });

      const props = await Promise.all(
        data.props.map(async (propItem) => {
          let propType = await prisma.type.findFirst({
            where: { name: propItem.prop.type.name, table_id: propTable.id },
          });
          if (!propType) {
            propType = await prisma.type.create({
              data: {
                name: propItem.prop.type.name,
                table_id: propTable.id,
              },
            });
          }

          let prop = await prisma.prop.findFirst({
            where: { key: propItem.prop.key, type_id: propType.id },
          });
          if (!prop) {
            let type = await prisma.type.findFirst({
              where: { name: propItem.prop.type.name, table_id: propTable.id },
            });
            if (!type) {
              type = await prisma.type.create({
                data: {
                  name: propItem.prop.type.name,
                  table_id: propTable.id,
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
              component_id: id,
              prop_id: prop.id,
            },
          });
          return { key: prop.key };
        })
      );
      const { tag_id, ...result } = component;
      const results = { ...result, props };

      return new Response(JSON.stringify(results), { status: 200 });
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(
        JSON.stringify({ status: "error", error_message: error }),
        { status: 400 }
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
