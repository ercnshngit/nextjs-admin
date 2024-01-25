import { TableService } from "@/services/table.service";

export async function createTableRelationsScript() {
  const tableService = new TableService("table-config-script");

  await tableService.createTableRelations();
  console.log("Relations successfully created.");
}

createTableRelationsScript();
