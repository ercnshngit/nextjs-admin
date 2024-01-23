import { prisma } from "@/libs/prisma";
import { Encryptor } from "@/services/functions/encryptor";
import {
  StartupService
} from "@/services/startup.service";
import { TableService } from "@/services/table.service";
import { TranslationService } from "@/services/translation.service";
import { TypeService } from "@/services/type.service";

const typesService = new TypeService("table-config-script");
const tableService = new TableService("table-config-script");
const translationService = new TranslationService("table-config-script");
const startupService = new StartupService("table-config-script");

//async function test() {
//
//  const deneme = await getAllApiPaths("./src/app/api", 10);
//   console.log("deneme :", deneme);
//   console.log("api_paths :", apiPaths);
//}
//
//test();

async function createTableConfig() {
  try {
    const tables = await tableService.createTableConfigOnlyTableNames();
    if (tables == null) {
      console.log("tables cannot created.");
    }
    const databaseTables = await tableService.getTables();
    if (databaseTables == null) {
      console.log("databaseTables cannot found.");
    }
    await typesService.setInputDataTypes();
    const tablesArray = Object.values(databaseTables);
    tablesArray.forEach(async (element) => {
      await tableService.migrateTableConfig(element.name);
    });
    console.log("Tables successfully created.");
    await tableService.createTableRelations();
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
    await translationService.createAllBasicTranslations();
  } catch (error) {
    console.log("error :", error);
    await tableService.createLog(error);
  }
}

createTableConfig();
