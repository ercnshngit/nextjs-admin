import { prisma } from "@/libs/prisma";
import { Encryptor } from "@/services/functions/encryptor";
import { TableService } from "@/services/table.service";
import { TypeService } from "@/services/type.service";
import { Console } from "console";

const typesService = new TypeService("");
const service = new TableService("");

async function createTableConfig() {
  try {
    const tables = await service.createTableConfigOnlyTableNames();
    if (tables == null) {
      console.log("tables cannot created.");
      return;
    }
    const databaseTables = await service.getTables();
    if (databaseTables == null) {
      console.log("databaseTables cannot found.");
      return;
    }
    await typesService.setInputDataTypes();
    const tablesArray = Object.values(databaseTables);
    tablesArray.forEach(async (element) => {
      await service.migrateTableConfig(element.name);
    });
    console.log("Tables successfully created.");
    await service.createTableRelations();
    console.log("Relations successfully created.");

    let adminRoleId = null;
    adminRoleId = await prisma.role.findFirst({
      where: {
        name: "admin",
      },
    });
    if (!adminRoleId) {
      adminRoleId = await prisma.role.create({
        data: {
          name: "admin",
        },
      });
    }
    console.log("adminRoleId :", adminRoleId)

    const userExist = await prisma.user.findFirst({
      where: {
        email: "demo",
      },
    });
    if (userExist) {
      return;
    }
    const encryptor = new Encryptor();

    await prisma.user.create({
      data: {
        first_name: "demo",
        last_name: "demo",
        email: "demo",
        password: await encryptor.hashPassword("demo"),
        role: {
          connect: {
            id: adminRoleId.id,
          },
        },
      },
    });
    
  } catch (error) {
    console.log("error :", error);
    await service.createLog(error);
  }
}

createTableConfig();