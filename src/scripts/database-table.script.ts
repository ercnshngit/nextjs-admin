import { prisma } from "@/libs/prisma";
import { TableService } from "@/services/table.service";
import { TypeService } from "@/services/type.service";

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
    tablesArray.forEach(async element => {
      await service.migrateTableConfig(element.name);
    });
    console.log("Config successfully created.");
  } catch (error) {
    console.log("error :", error);
    await service.createLog(error);
  }
}

createTableConfig();
