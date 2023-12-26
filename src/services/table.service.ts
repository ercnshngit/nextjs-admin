import { config } from "dotenv";
import {
  ConfirmMessages,
  ErrorMessages,
} from "../../constants/messages.constants";
import { SqlConstants } from "../../constants/sql";
import { InputTypes, TypeCategories } from "../../constants/types.constants";
import { prisma } from "../libs/prisma";
import { DatabaseTableDto } from "./dto/database-table.dto";
import { ColumnRelationCreateDto } from "./dto/column-relation.dto";
import { CrudOptionCreateDto } from "./dto/crud-option.dto";
import { LogService } from "./log.service";

config();
export class TableService extends LogService {
  async getTableNames() {
    try {
      const tableNames = await prisma.$queryRawUnsafe(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = '${process.env.DB_NAME}'`
      );
      return tableNames;
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return;
    }
  }

  async getTable(table_name: string) {
    try {
      const query = "SELECT * FROM `" + table_name + "`";
      console.log(query);
      const table = await prisma.$queryRawUnsafe(`${query}`);

      if (!table) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify(table), { status: 200 });
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async getTableById(table_name: string, id: number) {
    try {
      console.log(id);
      if (typeof id === "number") {
        // do something
        return new Response(
          JSON.stringify({ message: "id değeri girilmedi." })
        );
      }
      const query = SqlConstants.SELECT_ALL_WITH_ID_QUERRY(table_name, id);
      const table = await prisma.$queryRawUnsafe(`${query}`);
      if (!table) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify(table), { status: 200 });
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }
  async updateTableWithId(table_name: string, id: number, data: any) {
    try {
      let set: string = "";
      data.forEach((element: { key: string; value: string }) => {
        set += table_name + "." + element.key + " = '" + element.value + "' , ";
      });
      set = set.substring(0, set.length - 2);

      const query = SqlConstants.UPDATE_QUERRY_WITH_ID(table_name, set, id);
      const result = await prisma.$queryRawUnsafe(`${query}`);
      return new Response(
        JSON.stringify({
          message: ConfirmMessages.TABLE_UPDATE_SUCCESS_CONFIRM(),
        }),
        { status: 200 }
      );
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async createTable(table_name: string, data: any) {
    try {
      let columns = " (";
      let values = " (";
      data.forEach((element: { key: string; value: string }) => {
        columns += table_name + "." + element.key + ", ";
        values += "'" + element.value + "', ";
      });
      columns = columns.substring(0, columns.length - 2) + ") ";
      values = values.substring(0, values.length - 2) + ") ";

      const query =
        SqlConstants.INSERT_INTO +
        table_name +
        columns +
        SqlConstants.VALUES +
        values;
      console.log(query);
      const table = await prisma.$queryRawUnsafe(`${query}`);
      console.log(table);
      if (!table) {
        return new Response(
          JSON.stringify({
            message: ErrorMessages.TABLE_CANNOT_CREATED_ERROR(),
          })
        );
      }
      return new Response(JSON.stringify(table), { status: 200 });
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async getTableWithWhere(table_name: string, data: any) {
    try {
      let where: string = "";
      data.forEach((element: { key: string; value: string }) => {
        where += element.key + " = '" + element.value + "' AND ";
      });
      where = where.substring(0, where.length - 4);
      const query = SqlConstants.SELECT_ALL_WITH_WHERE_QUERRY(
        table_name,
        where
      );
      const table = await prisma.$queryRawUnsafe(`${query}`);
      if (!table) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify(table), { status: 200 });
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async deleteTableWithId(table_name: string, id: number) {
    try {
      const query = SqlConstants.DELETE_QUERY_WITH_ID(table_name, id);
      const result = await prisma.$queryRawUnsafe(`${query}`);
      if (!result) {
        return new Response(
          JSON.stringify({
            message: ErrorMessages.TABLE_CANNOT_DELETED_ERROR(),
          }),
          { status: 400 }
        );
      }
      return new Response(
        JSON.stringify({
          message: ConfirmMessages.TABLE_DELETE_SUCCESS_CONFIRM(),
        }),
        { status: 200 }
      );
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async getAllTableWithDatas() {
    try {
      let new_result: any[] = [];
      const query =
        "SELECT table_name as 'name' , JSON_ARRAYAGG(JSON_OBJECT('name',column_name , 'type' , data_type)) as 'columns' from information_schema.columns WHERE table_schema ='" +
        process.env.DB_NAME +
        "' GROUP BY table_name";
      console.log(query);
      const result = await prisma.$queryRawUnsafe(query);
      //const result = await prisma.$queryRaw`${query}`;
      Object.assign(new_result, result);
      new_result.forEach((element) => {
        element.columns = JSON.parse(element.columns);
        element.columns.forEach(
          (table_element: { [x: string]: string; type: string }) => {
            const type = table_element.type;
            // Veri Kontrolü ve dönüşüm alanı
            if (["int", "bigint", "tinyint"].includes(type)) {
              table_element.type = "number";
            } else if (["varchar", "datetime"].includes(type)) {
              table_element.type = "string";
            } else if (["text", "long"].includes(type)) {
              table_element.type = "string";
              table_element["inputType"] = "textarea";
            }
            // ------------------------------
          }
        );
      });
      return new Response(JSON.stringify(new_result), { status: 200 });
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async getTableWithDatas(table_name: string) {
    try {
      let new_result: any[] = [];
      const query =
        "SELECT table_name as 'name' , JSON_ARRAYAGG(JSON_OBJECT('name',column_name , 'type' , data_type)) as 'columns' from information_schema.columns WHERE table_schema ='" +
        process.env.DB_NAME +
        "' AND table_name = '" +
        table_name +
        "' GROUP BY table_name";
      const result = await prisma.$queryRawUnsafe(query);
      Object.assign(new_result, result);
      new_result.forEach((element) => {
        element.columns = JSON.parse(element.columns);
        element.columns.forEach(
          (table_element: { [x: string]: string; type: string }) => {
            const type = table_element.type;
            // Veri Kontrolü ve dönüşüm alanı
            if (["int", "bigint", "tinyint"].includes(type)) {
              table_element.type = "number";
              table_element["input_type_id"] = InputTypes.NUMBER.toString();
            } else if (["varchar", "datetime"].includes(type)) {
              table_element.type = "text";
              table_element["input_type_id"] = InputTypes.TEXT.toString();
            } else if (["text", "long"].includes(type)) {
              table_element.type = "textarea";
              table_element["input_type_id"] = InputTypes.TEXTAREA.toString();
            } else if (["date"].includes(type)) {
              table_element.type = "date";
              table_element["input_type_id"] = InputTypes.DATE.toString();
            } else if (["boolean"].includes(type)) {
              table_element.type = "checkbox";
              table_element["input_type_id"] = InputTypes.CHECKBOX.toString();
            }
            // ------------------------------
          }
        );
      });
      return new_result;
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async getConfigs() {
    try {
      const result = await prisma.database_table.findMany({
        include: {
          columns: {
            include: {
              column_relations: {
                include: {
                  table: true,
                  referenced_table: true,
                  pivot_table: true,
                  column: true,
                  referenced_column: true,
                  relation_type: true,
                },
              },
              options: true,
              input_type: true,
              create_crud_option: {
                include: {
                  input_type: true,
                },
              },
              read_crud_option: {
                include: {
                  input_type: true,
                },
              },
              update_crud_option: {
                include: {
                  input_type: true,
                },
              },
            },
          },
        },
      });
      if (!result) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async getTableConfig(table_name: string) {
    try {
      const result = await prisma.database_table.findFirst({
        where: {
          name: table_name,
        },
        include: {
          columns: {
            include: {
              options: true,
              column_relations: {
                include: {
                  table: true,
                  referenced_table: true,
                  pivot_table: true,
                  column: true,
                  referenced_column: true,
                  relation_type: true,
                },
              },
              input_type: true,
              create_crud_option: {
                include: {
                  input_type: true,
                },
              },
              read_crud_option: {
                include: {
                  input_type: true,
                },
              },
              update_crud_option: {
                include: {
                  input_type: true,
                },
              },
            },
          },
        },
      });
      if (!result) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      return new Response(
        JSON.stringify({
          ...result,
          columns: result.columns.map((column) => {
            const relation = column.column_relations.find(
              (relation) => relation.column_id == column.id
            );
            return {
              ...column,
              create_crud_option: column.create_crud_option,
              read_crud_option: column.read_crud_option,
              update_crud_option: column.update_crud_option,
              read: {
                inputType: column.read_crud_option?.input_type,
              },
              create: { inputType: column.read_crud_option?.input_type?.name },
              update: { inputType: column.read_crud_option?.input_type?.name },
              inputType: column.input_type?.name,
              relation: {
                ...relation,
                table: relation?.referenced_table?.name,
                keyColumn: "id",
                displayColumn: "name",
                type: "one",
                referenced_table: {
                  ...relation?.referenced_table,
                  name: relation?.referenced_table?.name,
                },
                pivot_table: {
                  ...relation?.pivot_table,
                  name: relation?.pivot_table?.name,
                },
              },
            };
          }),
        }),
        { status: 200 }
      );
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async updateTableConfig(table_name: string, data: DatabaseTableDto) {
    try {
      const tableData = await prisma.database_table.findFirst({
        where: { name: table_name },
        include: {
          columns: {
            select: {
              id: true,
              name: true,
              input_type_id: true,
              is_primary: true,
              is_required: true,
              is_unique: true,
              is_hidden: true,
              is_filterable: true,
              is_searchable: true,
              is_sortable: true,
              create_crud_option_id: true,
              read_crud_option_id: true,
              update_crud_option_id: true,
              input_type: true,
              create_crud_option: true,
              read_crud_option: true,
              update_crud_option: true,
              options: true,
            },
          },
        },
      });
      if (!tableData) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      if (!data) {
        return new Response(JSON.stringify({ message: "Data boş geldi." }));
      }
      //upserte cevir.
      Object.assign(tableData, data);
      const result = await prisma.database_table.update({
        where: { id: tableData.id },
        data: {
          name: tableData.name,
          icon: tableData.icon,
          is_hidden: tableData.is_hidden,
          can_create: tableData.can_create,
          can_update: tableData.can_update,
          columns: {
            upsert: data.columns?.map((column) => ({
              where: { id: column.id }, // Sütunun ID'sine göre kontrol et
              update: {
                name: column.name,
                is_filterable: column.is_filterable,
                is_hidden: column.is_hidden,
                is_unique: column.is_unique,
                is_required: column.is_required,
                is_searchable: column.is_searchable,
                is_sortable: column.is_sortable,
                is_primary: column.is_primary,
                input_type_id: column.input_type_id,
                create_crud_option_id: column.create_crud_option_id,
                read_crud_option_id: column.read_crud_option_id,
                update_crud_option_id: column.update_crud_option_id,
              },
              create: {
                name: column.name,
                is_filterable: column.is_filterable,
                is_hidden: column.is_hidden,
                is_unique: column.is_unique,
                is_required: column.is_required,
                is_searchable: column.is_searchable,
                is_sortable: column.is_sortable,
                is_primary: column.is_primary,
                input_type: {
                  connect: {
                    id: column.input_type_id,
                  },
                },
                options: {
                  upsert: column.options?.map((option) => ({
                    where: { id: option.id },
                    update: {
                      label: option.label,
                      value: option.value,
                      icon: option.icon,
                    },
                    create: {
                      label: option.label,
                      value: option.value,
                      icon: option.icon,
                    },
                  })),
                },
                create_crud_option:
                  column.create_crud_option == undefined
                    ? undefined
                    : {
                        create: {
                          name: column.create_crud_option?.name,
                          is_hidden: column.create_crud_option?.is_hidden,
                          is_required: column.create_crud_option?.is_required,
                          is_readonly: column.create_crud_option?.is_readonly,
                          type_id: column.create_crud_option?.input_type?.id,
                        },
                      },
                read_crud_option:
                  column.read_crud_option == undefined
                    ? undefined
                    : {
                        connectOrCreate: {
                          where: { id: column.read_crud_option_id },
                          create: {
                            name: column.read_crud_option?.name,
                            is_hidden: column.read_crud_option?.is_hidden,
                            is_required: column.read_crud_option?.is_required,
                            is_readonly: column.read_crud_option?.is_readonly,
                            type_id: column.read_crud_option?.input_type?.id,
                          },
                        },
                      },
                update_crud_option:
                  column.update_crud_option_id == undefined
                    ? undefined
                    : {
                        connectOrCreate: {
                          where: { id: column.update_crud_option_id },
                          create: {
                            name: column.update_crud_option?.name,
                            is_hidden: column.update_crud_option?.is_hidden,
                            is_required: column.update_crud_option?.is_required,
                            is_readonly: column.update_crud_option?.is_readonly,
                            type_id: column.update_crud_option?.input_type?.id,
                          },
                        },
                      },
              },
            })),
          },
        },
        include: {
          columns: {
            include: {
              options: true,
              input_type: true,
              create_crud_option: {
                include: {
                  input_type: true,
                },
              },
              read_crud_option: {
                include: {
                  input_type: true,
                },
              },
              update_crud_option: {
                include: {
                  input_type: true,
                },
              },
            },
          },
        },
      });
      if (!result) {
        return new Response(
          JSON.stringify({
            message: ErrorMessages.TABLE_UPDATE_FAILED_ERROR(),
          }),
          { status: 500 }
        );
      }
      return new Response(
        JSON.stringify({
          message: ConfirmMessages.TABLE_CONFIG_DATA_UPDATE_SUCCESS_CONFIRM(),
        }),
        { status: 200 }
      );
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }));
    }
  }

  async createTableConfigWithTableName(
    table_name: string,
    input_types?: any[] | undefined
  ) {
    try {
      const tableDatas = await this.getTableWithDatas(table_name);
      const tableDataArray = Object.values(tableDatas);
      const input_type_ids =
        input_types == undefined
          ? await prisma.type.findMany({
              select: {
                id: true,
                name: true,
                table: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
              where: {
                table: {
                  name: TypeCategories.INPUT_TYPE,
                },
              },
            })
          : input_types;
      if (!input_type_ids) {
        return new Response(
          JSON.stringify({ message: "Input type mevcut değil." }),
          { status: 404 }
        );
      }
      const inputTypesArray = Object.values(input_type_ids);
      const result = await prisma.database_table.create({
        include: {
          columns: {
            include: {
              input_type: true,
            },
          },
        },
        data: {
          name: table_name,
          columns: {
            create: tableDataArray[0].columns.map((column: any) => ({
              name: column.name,
              input_type: {
                connect: {
                  id: inputTypesArray.filter(
                    (input_type) =>
                      input_type.name == column.type &&
                      input_type.table?.name == TypeCategories.INPUT_TYPE
                  )[0].id,
                },
              },
            })),
          },
        },
      });
      return new Response(JSON.stringify({ result }), { status: 200 });
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async deleteTableConfigWithTableName(table_name: string) {
    try {
      const table = await prisma.database_table.findFirst({
        where: {
          name: table_name,
        },
      });
      if (!table) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      console.log(table.id);
      const result = await prisma.database_table.delete({
        include: {
          columns: true,
        },
        where: {
          id: table.id,
          columns: {
            every: {
              table_id: table.id,
            },
          },
        },
      });
      return new Response(
        JSON.stringify({
          message: ConfirmMessages.TABLE_CONFIG_DELETE_SUCCESS_CONFIRM(),
          data: result,
        }),
        { status: 200 }
      );
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async createCrudOption(column_id: number, data: CrudOptionCreateDto) {
    try {
      const result = await prisma.crud_option.create({
        data: {
          name: data.name,
          is_hidden: data.is_hidden,
          is_readonly: data.is_readonly,
          is_required: data.is_required,
          input_type_id: data.input_type_id,
        },
      });
      if (!result) {
        return new Response(
          JSON.stringify({
            message: ErrorMessages.CRUD_OPTION_CREATE_FAILED_ERROR(),
          }),
          { status: 400 }
        );
      }

      const updatedDataBaseTableColumn =
        await prisma.database_table_column.update({
          where: {
            id: +column_id,
          },
          data:
            data.crud_type == 1
              ? { create_crud_option_id: result.id }
              : data.crud_type == 2
              ? { update_crud_option_id: result.id }
              : { read_crud_option_id: result.id },
        });

      if (!updatedDataBaseTableColumn) {
        return new Response(
          JSON.stringify({
            message: ErrorMessages.DATABASE_TABLE_COLUMN_UPDATE_FAILED_ERROR(),
          }),
          { status: 400 }
        );
      }

      return new Response(JSON.stringify({ updatedDataBaseTableColumn }), {
        status: 200,
      });
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async createTableConfig() {
    let tableConifgs = [] as any[];
    try {
      const tableNames = await this.getTableNames();
      if (!tableNames) {
        return new Response(JSON.stringify({ message: "Tablo mevcut değil." }));
      }
      const tableNamesArray = Object.values(tableNames);
      const input_type_ids = await prisma.type.findMany({
        select: {
          id: true,
          name: true,

          table: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        where: {
          table: {
            name: TypeCategories.INPUT_TYPE,
          },
        },
      });
      if (!input_type_ids) {
        return new Response(
          JSON.stringify({ message: "Input type mevcut değil." }),
          { status: 404 }
        );
      }
      const inputTypesArray = Object.values(input_type_ids);
      tableNamesArray.forEach(async (element) => {
        const result = this.createTableConfigWithTableName(
          element,
          inputTypesArray
        );
        if (result) {
          tableConifgs.push(result);
        }
      });
      return new Response(
        JSON.stringify(
          tableConifgs.length == 0
            ? { message: "Tüm tablolar eklenmiştir." }
            : tableConifgs
        ),
        { status: 200 }
      );
    } catch (error: any) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async createColumnRelation(data: ColumnRelationCreateDto) {
    try {
      const result = await prisma.column_relation.create({
        data: {
          table_id: data.table_id,
          column_id: data.column_id,
          referenced_table_id: data.referenced_table_id,
          referenced_column_id: data.referenced_column_id,
          pivot_table_id: data.pivot_table_id,
          relation_type_id: data.relation_type_id,
          foreign_key_name: data.foreign_key_name,
        },
      });
      return new Response(JSON.stringify({ result }), { status: 200 });
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async getAllColumnRelations() {
    try {
      const relations = await prisma.column_relation.findMany({
        include: {
          table: true,
          referenced_table: true,
          pivot_table: true,
          column: true,
          referenced_column: true,
          relation_type: true,
        },
      });
      if (!relations) {
        return new Response(
          JSON.stringify({
            message: ErrorMessages.COLUMN_RELATION_NOT_FOUND_ERROR(),
          }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify({ relations }), { status: 200 });
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }
}
