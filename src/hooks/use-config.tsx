"use client";
import { getTablesConfigs } from "@/services/dashboard";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { useQuery } from "@tanstack/react-query";

export function useConfig(table_name?: string) {
  const {
    data: configs,
    isLoading,
    error,
  } = useQuery<DatabaseTableDto[]>(["tables"], () => getTablesConfigs());

  if (!table_name)
    return {
      configs,
      isLoading,
      error,
      table: null,
    } as {
      configs: DatabaseTableDto[];
      isLoading: boolean;
      error: any;
      table: null;
    };
  const table = configs?.find((config) => config.name === table_name);

  const filterables = table?.columns?.filter((table) => table.is_filterable);
  const searchables = table?.columns?.filter((table) => table.is_searchable);
  const sortables = table?.columns?.filter((table) => table.is_sortable);
  return {
    configs,
    isLoading,
    error,
    table,
    filterables,
    sortables,
    searchables,
  };
}
