"use client";
import {
  createTableConfig,
  getTablesConfigs,
  getTablesStructure,
} from "@/services/dashboard";
import { Database_Table } from "@/types/config";
import { database_table, database_table_column } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDatabase(table_name?: string) {
  const {
    data: tables,
    isLoading: isLoadingTables,
    error: tableError,
  } = useQuery<
    { id: number; name: string; columns: { name: string; type: string }[] }[]
  >(["tables"], () => getTablesStructure());

  const {
    data: configs,
    error: configError,
    isLoading: isLoadingConfigs,
  } = useQuery<Database_Table[]>(["configs"], () => getTablesConfigs());

  const error = configError || tableError;
  const isLoading = isLoadingTables || isLoadingConfigs;

  const queryClient = useQueryClient();

  const createConfig = useMutation(
    (table_name: string) => {
      return createTableConfig({ table_name });
    },
    {
      onSuccess: () => {
        toast.success("Tablo oluşturuldu");
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
