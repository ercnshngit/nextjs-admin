import { prisma } from "@/libs/prisma";
import { TableService } from "@/services/table.service";
import { TypeService } from "@/services/type.service";

const typesService = new TypeService("");
const service = new TableService("");

async function createTableConfig() {
  const res = await prisma.database_table.findFirst({
    where: {
      name: "database_table_column",
    },
  });
  if (!res) {
    await prisma.database_table.create({
      data: {
        name: "database_table_column",
      },
    });
  }
  console.log("resasdasd", res);
  await typesService.setInputDataTypes();
  await service.createTableConfig();
}

createTableConfig();
