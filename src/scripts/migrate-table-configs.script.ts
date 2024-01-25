import { TableService } from "@/services/table.service";

export async function migrateTableConfig() {
  const tableService = new TableService("table-config-script");

  const databaseTables = await tableService.getTables();
  if (databaseTables == null) {
    console.log("databaseTables cannot found.");
  }
  const tablesArray = Object.values(databaseTables);
  tablesArray.forEach(async (element) => {
    await tableService.migrateTableConfig(element.name);
  });
  console.log("Tables successfully created.");
}

migrateTableConfig();
