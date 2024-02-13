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
  const component = await prisma.database_table.findFirst({
    where: { name: "component" },
  });
  const prop = await prisma.database_table.findFirst({
    where: { name: "prop" },
  });

  if (!block || !menu || !component || !prop) {
    console.log("Block table not found.");
    return;
  }
  // add types for block
  await prisma.type.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "Page",
        language_code: "en",
        table_id: block.id,
      },

      {
        name: "Slider",
        language_code: "en",
        table_id: block.id,
      },

      {
        name: "Form",
        language_code: "en",
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
      {
        name: "Page Component",
        table_id: component.id,
      },
      {
        name: "Slider Component",
        table_id: component.id,
      },
      {
        name: "Form Component",
        table_id: component.id,
      },
      {
        name: "checkbox",
        table_id: prop.id,
      },
      {
        name: "date",
        table_id: prop.id,
      },
      {
        name: "hidden",
        table_id: prop.id,
      },
      {
        name: "slugify",
        table_id: prop.id,
      },
      {
        name: "image",
        table_id: prop.id,
      },
      {
        name: "file",
        table_id: prop.id,
      },
      {
        name: "multi-select",
        table_id: prop.id,
      },
      {
        name: "number",
        table_id: prop.id,
      },
      {
        name: "relation",
        table_id: prop.id,
      },
      {
        name: "select",
        table_id: prop.id,
      },
      {
        name: "icon-select",
        table_id: prop.id,
      },
      {
        name: "textarea",
        table_id: prop.id,
      },
      {
        name: "icon-select",
        table_id: prop.id,
      },
      {
        name: "richtext",
        table_id: prop.id,
      },
      {
        name: "text",
        table_id: prop.id,
      },
    ],
  });
}

createDemoData();
