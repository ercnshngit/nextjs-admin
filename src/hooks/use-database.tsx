import { getTablesStructure } from "@/services/dashboard";
import { Database_Table } from "@/types/config";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export function useDatabase(table_name?: string) {
  const {
    data: tables,
    isLoading,
    error,
  } = useQuery(["tables"], () => getTablesStructure());

  const filterables = tables?.filter((table) => table.filterable);

  if (!table_name)
    return { tables, isLoading, error, table: null } as {
      tables: Database_Table[];
      isLoading: boolean;
      error: any;
      table: null;
    };

  return { tables, isLoading, error, table: tables[table_name] } as {
    tables: Database_Table[];
    isLoading: boolean;
    error: any;
    table: Database_Table;
  };
}
