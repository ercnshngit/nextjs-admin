"use client";
import {
  createTableConfig,
  deleteTableConfig,
  getTable,
  getTableConfig,
  getTableItemByColumnAndValue,
  getTablesConfigs,
  getTablesStructure,
  recreateTableConfig,
} from "@/services/dashboard";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useTable(table_name: string) {
  const {
    data: table,
    error: error,
    isLoading: isLoading,
  } = useQuery<DatabaseTableDto>(["database_table", "config", table_name], () =>
    getTableConfig({
      table_name,
    })
  );

  const filterables = table?.columns?.filter((table) => table.is_filterable);

  const searchables = table?.columns?.filter((table) => table.is_searchable);
  const sortables = table?.columns?.filter((table) => table.is_sortable);

  return { table, filterables, sortables, searchables, isLoading, error };
}

export function useTableDataByColumnAndValue({
  tableName,
  column,
  value,
  options,
}: {
  tableName: string;
  column: string;
  value: string | number;
  options?: any;
}) {
  const {
    data: item,
    error: error,
    isLoading: isLoading,
  } = useQuery(
    [tableName, column, value],
    () =>
      getTableItemByColumnAndValue({
        tableName,
        column,
        value,
      }),
    options
  );

  return { item, isLoading, error };
}

export function useTableData({
  tableName,

  options,
}: {
  tableName: string;

  options?: any;
}) {
  const { data, error, isLoading } = useQuery(
    [tableName],
    () =>
      getTable({
        tableName,
      }),
    options
  );

  return { data, error };
}

export const useConfigs = () => {
  const {
    data: configs,
    error,
    isLoading,
  } = useQuery<DatabaseTableDto[]>(["configs"], () => getTablesConfigs());

  return { configs, error, isLoading };
};

export const useDatabase = (table_name?: string) => {
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
  } = useQuery<DatabaseTableDto[]>(["configs"], () => getTablesConfigs());

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

  const updateConfig = useMutation(
    (table_name: string) => {
      return recreateTableConfig({ table_name });
    },
    {
      onSuccess: () => {
        toast.success("Tablo güncellendi");
        queryClient.invalidateQueries(["configs"]);
      },
    }
  );

  const deleteConfig = useMutation(
    (table_name: string) => {
      return deleteTableConfig({ table_name });
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
      updateConfig,
      tables,
      createConfig,
      deleteConfig,
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
    updateConfig,
    tables,
    configs,
    createConfig,
    deleteConfig,
    isLoading,
    error,
    table,
    filterables,
    sortables,
    searchables,
  };
};
