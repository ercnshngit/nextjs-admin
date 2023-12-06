"use client";
import { getTablesConfigs } from "@/services/dashboard";
import { Column, Database_Table } from "@/types/config";
import {
  column_option,
  database_table,
  database_table_column,
} from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useConfig(table_name?: string) {
  const {
    data: configs,
    isLoading,
    error,
  } = useQuery<(database_table & { columns: database_table_column[] })[]>(
    ["tables"],
    () => getTablesConfigs()
  );

  if (!table_name)
    return {
      configs,
      isLoading,
      error,
      table: null,
    } as {
      configs: database_table[];
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
