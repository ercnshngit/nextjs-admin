"use client";
import { Button } from "@/components/ui/button";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { CircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { columns } from "@/components/data-table/columns";
import { useDatabase, useTable } from "@/hooks/use-database";
import { useTranslate } from "@/langs";

import { DataTable } from "../../data-table/data-table";
import useSearchParams from "@/hooks/use-search-params";
import { Row } from "@tanstack/react-table";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { useQuery } from "@tanstack/react-query";
import { getTable } from "@/services/dashboard";
import { useDataLanguageOfTable } from "@/utils/use-data-language";
import { useLanguage } from "@/contexts/language-context";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function ListPage({
  slug,
  data,
  addButtonHref,
  buttons,
}: {
  slug: string;
  data: any;
  addButtonHref?: any;
  buttons?: (row: Row<any>) => React.ReactNode;
}) {
  const [noLangMode, setNoLangMode] = useState(false);
  const searchParams = useSearchParams();
  const allParams = searchParams.getAllQueryString();
  const page = Number(allParams?.["page"]) || 1;
  const { table, filterables, searchables } = useTable(slug);
  const { translate } = useTranslate();

  const tableName = table?.name || "";
  const tableColumns = columns(
    slug,
    table?.columns || [],
    buttons,
    table,
    translate
  );

  const { dataIds, language } = useDataLanguageOfTable({ table_name: slug });
  const [tableData, setTableData] = useState(
    data?.filter((row: any) =>
      table?.can_translate ? dataIds.includes(row.id) : true
    )
  );

  useEffect(() => {
    setTableData(
      data?.filter((row: any) =>
        table?.can_translate && !noLangMode ? dataIds.includes(row.id) : true
      )
    );
  }, [data, language, noLangMode]);

  const filterablesData = filterables?.map((filterable) => {
    if (data && Array.isArray(data)) {
      return {
        ...filterable,
        options: Array.from(
          new Set(data?.map((row: any) => row[filterable.name]))
        ).map((option) => {
          return {
            label: option,
            value: option,
            icon: null,
          };
        }),
      };
    }
  });

  const searchablesData = searchables;
  return (
    <Card className="p-8">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">{translate(tableName)}</h3>
        {table?.can_create !== false && (
          <div className="flex gap-4 items-center">
            <Button asChild>
              <Link
                href={
                  addButtonHref
                    ? addButtonHref
                    : {
                        pathname: "/dashboard/" + tableName + "/ekle",
                        query: searchParams.getAllQueryString(),
                      }
                }
              >
                <PlusCircledIcon className="w-4 h-4 mr-2" />
                Yeni {translate(tableName)} ekle
              </Link>
            </Button>
          </div>
        )}
      </div>
      <div className="w-full py-10">
        {table?.can_translate && (
          <div className="flex items-center space-x-2">
            <Switch
              id="noLang-mode"
              checked={noLangMode}
              onCheckedChange={() => setNoLangMode(!noLangMode)}
            />
            <Label htmlFor="noLang-mode">
              Dil belirlenmemis verileri goster
            </Label>
          </div>
        )}
        {tableData && (
          <DataTable
            tableName={tableName}
            columns={tableColumns}
            data={
              Object.keys(allParams).length > 0
                ? tableData.filter((data: any) =>
                    Object.keys(allParams).every((key) =>
                      data.hasOwnProperty(key)
                        ? String(data[key as any]) ===
                          String(allParams[key as any])
                        : true
                    )
                  )
                : tableData
            }
            page={page ? page : 1}
            filterables={filterablesData}
            searchables={searchablesData}
            databaseTableColumns={table?.columns || []}
          />
        )}
      </div>
    </Card>
  );
}
