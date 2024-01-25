import { TableService } from "@/services/table.service";

export async function createTableConfigsScript() {
  const tableService = new TableService("table-config-script");

  const tables = await tableService.createTableConfigOnlyTableNames();
  if (tables == null) {
    console.warn("tables cannot created.");
  }
}

createTableConfigsScript();
