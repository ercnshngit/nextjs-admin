import { prisma } from "@/libs/prisma";
import { ErrorMessages } from "../../constants/messages.constants";
import { TypeCategories, TypeJsons } from "../../constants/types.constants";
import { BaseService } from "./base.service";

export class TypeService extends BaseService {
  constructor(request?: any) {
    super(request);
  }
  // TypeJsonda kaydedılmıs input_type lerini varsa pas gecıyor yoksa insertliyor
  async setInputDataTypes() {
    try {
      const table = await prisma.database_table.findFirst({
        where: {
          name: TypeCategories.INPUT_TYPE,
        },
      });
      if (!table) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }

      let input_types = [] as any;
      TypeJsons.INPUT_TYPES.forEach(async (element) => {
        const isTypeExist = await prisma.type.findFirst({
          where: {
            name: element.name,
          },
        });
        if (isTypeExist) {
          return;
        }
        const result = await prisma.type.create({
          include: {
            table: {
              where: {
                name: element.table_name,
              },
            },
          },
          data: {
            name: element.name,
            table: {
              connect: {
                id: table.id,
              },
            },
          },
        });
        input_types.push(result);
      });
      if (input_types.length > 1) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      return new Response(
        JSON.stringify({
          status: "success",
          message: "Input types created successfully",
          data: input_types,
        }),
        { status: 200 }
      );
    } catch (error) {
      await this.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 400,
      });
    }
  }

  async setRelationTypes() {
    try {
      const table = await prisma.database_table.findFirst({
        where: {
          name: TypeCategories.RELATION_TYPE,
        },
      });
      if (!table) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      let relation_types = [] as any;
      TypeJsons.RELATION_TYPES.forEach(async (element) => {
        const result = await prisma.type.create({
          include: {
            table: true,
          },
          data: {
            name: element.name,
            table: {
              connect: {
                id: table.id,
              },
            },
          },
        });
        relation_types.push(result);
      });
      if (relation_types.length > 1) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      return new Response(
        JSON.stringify({
          status: "success",
          message: "Relation types created successfully",
          data: relation_types,
        }),
        { status: 200 }
      );
    } catch (error) {
      await this.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 400,
      });
    }
  }

  async getInputDataTypes() {
    try {
      const result = await prisma.type.findMany({
        where: {
          table: {
            name: TypeCategories.INPUT_TYPE,
          },
        },
      });
      if (!result) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      await this.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 400,
      });
    }
  }

  async getRelationTypes() {
    try {
      const result = await prisma.type.findMany({
        where: {
          table: {
            name: TypeCategories.RELATION_TYPE,
          },
        },
      });
      if (!result) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      await this.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 400,
      });
    }
  }

  async getTypeWithTableName(table_name: string) {
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
      const result = await prisma.type.findMany({
        where: {
          table: {
            id: table.id,
          },
        },
      });
      if (!result) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      await this.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 400,
      });
    }
  }

  async getTypesTableNames() {
    try {
      const query =
        "SELECT dbt.id, dbt.name FROM `teknopark_admin_db`.`type` as t LEFT JOIN `teknopark_admin_db`.`database_table` as dbt ON t.table_id = dbt.id GROUP BY dbt.name";
      const result = await prisma.$queryRawUnsafe(`${query}`);
      if (!result) {
        return new Response(
          JSON.stringify({ message: ErrorMessages.TYPE_NOT_FOUND_ERROR() }),
          { status: 404 }
        );
      }
      const tableNameAndIds = Object.values(result);
      return new Response(JSON.stringify(tableNameAndIds), { status: 200 });
    } catch (error) {
      await this.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 400,
      });
    }
  }
}
