import { getTablesStructure } from "@/services/dashboard";
import { Column, Database_Table } from "@/types/config";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export function useDatabase(table_name?: string) {
  const {
    data: tables,
    isLoading,
    error,
  } = useQuery<Database_Table[]>(["tables"], () => getTablesStructure());

  if (!table_name)
    return {
      tables,
      isLoading,
      error,
      table: null,
      filterables: null,
      sortables: null,
      searchables: null,
    } as {
      tables: Database_Table[];
      isLoading: boolean;
      error: any;
      table: null;
      filterables: null;
      searchables: null;
      sortables: null;
    };
  const table = tables?.find((table) => table.name === table_name);

  const filterables = table?.columns?.filter((table) => table.is_filterable);
  const searchables = table?.columns?.filter((table) => table.is_searchable);
  const sortables = table?.columns?.filter((table) => table.is_sortable);
  return {
    tables,
    isLoading,
    error,
    table,
    filterables,
    sortables,
    searchables,
  } as {
    tables: Database_Table[];
    isLoading: boolean;
    error: any;
    table: Database_Table;
    filterables: Column[];
    searchables: Column[];
    sortables: Column[];
  };
}
