"use client";
import {
  createTableConfig,
  getTablesConfigs,
  getTablesStructure,
} from "@/services/dashboard";
import { database_table, database_table_column } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDatabase(table_name?: string) {
  const {
    data: tables,
    isLoading,
    error,
  } = useQuery<
    { id: number; name: string; columns: { name: string; type: string }[] }[]
  >(["tables"], () => getTablesStructure());

  const { data: configs } = useQuery<
    (database_table & { columns: database_table_column[] })[]
  >(["configs"], () => getTablesConfigs());

  const queryClient = useQueryClient();

  const createConfig = useMutation(
    (config: Partial<database_table>) => {
      return createTableConfig(config);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["configs"]);
      },
    }
  );

  if (!table_name)
    return {
      tables,
      createConfig,
      configs,
      isLoading,
      error,
      table: null,
      filterables: null,
      sortables: null,
      searchables: null,
    };
  const table = configs?.find((table) => table.name === table_name);

  const filterables = table?.columns?.filter((table) => table.is_filterable);
  const searchables = table?.columns?.filter((table) => table.is_searchable);
  const sortables = table?.columns?.filter((table) => table.is_sortable);
  return {
    tables,
    configs,
    createConfig,
    isLoading,
    error,
    table,
    filterables,
    sortables,
    searchables,
  };
}
