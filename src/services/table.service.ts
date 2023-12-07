import { prisma } from "@/libs/prisma";
import { SqlConstants } from "../../constants/sql";
import {
  ConfirmMessages,
  ErrorMessages,
} from "../../constants/messages.constants";
import { config } from "dotenv";
import { DatabaseTableDto } from "./dto/database-table.dto";
import { Input } from "@/components/ui/input";
import { InputTypes, TypeCategories } from "../../constants/types.constants";

config();
export class TableService {
  async getTable(table_name: string) {
    const query = `SELECT * FROM ${table_name}`;
    const table = await prisma.$queryRawUnsafe(`${query}`);
    if (!table) {
      return new Response(
        JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() })
      );
    }
    return new Response(JSON.stringify(table));
  }

  async getTableById(table_name: string, id: number) {
    try {
        console.log(id)
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
            JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() })
          );
        }
        return new Response(JSON.stringify(table));
    } catch (error) {
        return new Response(JSON.stringify({ status: "error", message: error }));
    }
    
  }

  async createTable(table_name: string, data: any) {
    try {
        let columns = " (";
        let values = " (";
        data.forEach((element: { key: string; value: string }) => {
          columns += element.key + ", ";
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
        return new Response(JSON.stringify(table));
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ status: "error", message: error }));
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
          JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() })
        );
      }
      return new Response(JSON.stringify(table));
    } catch (error) {
      return new Response(JSON.stringify({ status: "error", message: error }));
    }
  }

  async updateTableWithId(table_name: string, id: number, data: any) {
    try {
      let set: string = "";
      data.forEach((element: { key: string; value: string }) => {
        set += element.key + " = '" + element.value + "' , ";
      });
      set = set.substring(0, set.length - 2);

      const query = SqlConstants.UPDATE_QUERRY_WITH_ID(table_name, set, id);
      const result = await prisma.$queryRaw`${query}`;
      return new Response(
        JSON.stringify({
          message: ConfirmMessages.TABLE_UPDATE_SUCCESS_CONFIRM(),
        })
      );
    } catch (error) {
      return new Response(JSON.stringify({ status: "error", message: error }));
    }
  }

  async deleteTableWithId(table_name: string, id: number) {
    try {
      const query = SqlConstants.DELETE_QUERY_WITH_ID(table_name, id);
      const result = await prisma.$queryRaw`${query}`;
      return new Response(
        JSON.stringify({
          message: ConfirmMessages.TABLE_DELETE_SUCCESS_CONFIRM(),
        })
      );
    } catch (error) {
      return new Response(JSON.stringify({ status: "error", message: error }));
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
      return new Response(JSON.stringify(new_result));
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }));
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
              if(type == "tinyint"){
                table_element["input_type_id"] = InputTypes.TINYINT.toString();
              }else if(type == "int"){
                table_element["input_type_id"] = InputTypes.INT.toString();
              }else if(type == "bigint"){
                table_element["input_type_id"] = InputTypes.BIGINT.toString();
              }
              table_element.type = "number";
            } else if (["varchar", "datetime"].includes(type)) {
              if(type == "varchar"){
                table_element["input_type_id"] = InputTypes.VARCHAR.toString();
              }else if(type == "datetime"){
                table_element["input_type_id"] = InputTypes.INT.toString();
              }
              table_element.type = "string";
            } else if (["text", "long"].includes(type)) {
              table_element.type = "string";
              table_element["inputType"] = "textarea";
              table_element["input_type_id"] = InputTypes.TEXT.toString();
            } else if (["date"].includes(type)) {
              table_element.type = "string";
              table_element["input_type_id"] = InputTypes.DATE.toString();
              table_element["inputType"] = "date";
            }else if (["boolean"].includes(type)) {
              table_element.type = "boolean";
              table_element["input_type_id"] = InputTypes.BOOLEAN.toString();
              table_element["inputType"] = "checkbox";
            }
            // ------------------------------
          }
        );
      });
      return new_result;
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }));
    }
  }

  async getConfigs() {
    try {
      const result = await prisma.database_table.findMany({
        include: {
          columns: {
            include: {
              column_relations : {
                include : {
                  referenced_table : {
                    select : {
                      name : true,
                    }
                  },
                  pivot_table : {
                    select : {
                      name : true,
                    }
                  }
                }
              },
              type: true,
              input_type: true,
              create_crud_option: {
                include: {
                  InputType: true,
                },
              },
              read_crud_option: {
                include: {
                  InputType: true,
                },
              },
              update_crud_option: {
                include: {
                  InputType: true,
                },
              },
            },
          },
        },
      });
      if (!result) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() })
        );
      }
      return new Response(JSON.stringify(result));
    } catch (error) {
      return new Response(JSON.stringify({ status: "error", message: error }));
    }
  }

  async getTableConfig(table_name: string) {
    try {
      const result = await prisma.database_table.findMany({
        where: {
          name: table_name,
        },
        include: {
          columns: {
            include: {
              column_relations : {
                include : {
                  referenced_table : {
                    select : {
                      name : true,
                    }
                  },
                  pivot_table : {
                    select : {
                      name : true,
                    }
                  }
                }
              },
              type: true,
              input_type: true,
              create_crud_option: {
                include: {
                  InputType: true,
                },
              },
              read_crud_option: {
                include: {
                  InputType: true,
                },
              },
              update_crud_option: {
                include: {
                  InputType: true,
                },
              },
            },
          },
        },
      });
      if (!result) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() })
        );
      }
      return new Response(JSON.stringify(result));
    } catch (error) {
      return new Response(JSON.stringify({ status: "error", message: error }));
    }
  }

  async updateTableConfig(table_name: string, data: DatabaseTableDto) {
    try {
      const tableData = await prisma.database_table.findUnique({
        where: { name: table_name },
        include: {
          columns: {
            select: {
              id: true,
              name: true,
              type_id: true,
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
              type: true,
              input_type: true,
              create_crud_option: true,
              read_crud_option: true,
              update_crud_option: true,
            },
          },
        },
      });
      if (!tableData) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() })
        );
      }
      if (!data) {
        return new Response(JSON.stringify({ message: "Data boş geldi." }));
      }
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
            upsert: tableData.columns.map((column) => ({
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
                type_id: column.type_id,
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
                type_id: column.type_id,
                input_type_id: column.input_type_id,
                create_crud_option_id: column.create_crud_option_id,
                read_crud_option_id: column.read_crud_option_id,
                update_crud_option_id: column.update_crud_option_id,
              },
            })),
          },
        },
        include: {
          columns: {
            include: {
              type: true,
              input_type: true,
              create_crud_option: {
                include: {
                  InputType: true,
                },
              },
              read_crud_option: {
                include: {
                  InputType: true,
                },
              },
              update_crud_option: {
                include: {
                  InputType: true,
                },
              },
            },
          },
        },
      });
      if (!result) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TABLE_UPDATE_FAILED_ERROR() })
        );
      }
      return new Response(
        JSON.stringify({
          message: ConfirmMessages.TABLE_CONFIG_DATA_UPDATE_SUCCESS_CONFIRM(),
        })
      );
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }));
    }
  }

  async createTableConfig(table_name : string){
    try {
      const tableData = await this.getTableWithDatas(table_name);
      if(tableData instanceof Response){
        return tableData;
      }
      const table = tableData[0];
      console.log(table.columns)
      const result = await prisma.database_table.create({
        include: {
          columns: {
            include : {
              type: true,
              input_type: true,
            }
          }
        },
        data: {
          name: table.name,
          columns: {
            create: table.columns.map((column :any) => ({
              name: column.name,
              input_type : {
                connect:{
                  ui_name_type_category_id :{
                    name : InputTypes.INPUT_TYPES.filter((inputType) => inputType.id == column.input_type_id)[0].name,
                    type_category_id : TypeCategories.INPUT_TYPE
                  }
                },
              }
            })),
          },
        },
      });
      console.log(table)
      return new Response(JSON.stringify(tableData));
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }));
    }
  }
}
