import { useLanguage } from "@/contexts/language-context";
import {
  createDataLanguage,
  getDataLanguagesByTable,
  getTable,
  getTableConfig,
} from "@/services/dashboard";
import { DataLanguageDto } from "@/services/dto/data_language.dto";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useDataLanguageMutation({
  table_name,
}: {
  table_name: string;
}) {
  const table = useQuery(["database_table", table_name], () =>
    getTableConfig({ table_name })
  );

  const { language } = useLanguage();

  const queryClient = useQueryClient();

  const dataLanguageMutation = useMutation({
    mutationFn: (data: any) =>
      createDataLanguage({
        language_code: language,
        database_table_id: table.data?.id || 0,
        data_id: data.id,
      }),
    onSuccess: () => {
      console.log("Data language created");
      queryClient.invalidateQueries(["dataLanguage", table_name]);
    },
  });

  return {
    dataLanguageMutation,
  };
}

export function useDataLanguageOfTable({ table_name }: { table_name: string }) {
  const { language } = useLanguage();

  const dataLanguage = useQuery(["dataLanguage", table_name], () =>
    getDataLanguagesByTable({ table_name })
  );

  const dataIds =
    dataLanguage.data
      ?.filter((data) => language === data.language_code)
      .map((data: DataLanguageDto) => data.data_id) || [];

  const allDataIds =
    dataLanguage.data?.map((data: DataLanguageDto) => data.data_id) || [];

  return { dataIds, language, allDataIds };
}
