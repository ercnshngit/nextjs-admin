import { prisma } from "@/libs/prisma";
import { Encryptor } from "@/services/functions/encryptor";
import { TableService } from "@/services/table.service";

export async function createDemoData() {
  // find block table id
  const block = await prisma.database_table.findFirst({
    where: { name: "block" },
  });
  const menu = await prisma.database_table.findFirst({
    where: { name: "menu" },
  });

  if (!block || !menu) {
    console.log("Block table not found.");
    return;
  }
  // add types for block
  await prisma.type.createMany({
    data: [
      {
        name: "Page",
        language_code: "en",
        table_id: block.id,
      },
      {
        name: "Sayfa",
        language_code: "tr",
        table_id: block.id,
      },
      {
        name: "Slider",
        language_code: "en",
        table_id: block.id,
      },
      {
        name: "Slayt",
        language_code: "tr",
        table_id: block.id,
      },
      {
        name: "Form",
        language_code: "en",
        table_id: block.id,
      },
      {
        name: "Form",
        language_code: "tr",
        table_id: block.id,
      },
      {
        name: "Mainmenu",
        language_code: "en",
        table_id: menu.id,
      },
      {
        name: "Ana Menü",
        language_code: "tr",
        table_id: menu.id,
      },
    ],
  });
}

createDemoData();
