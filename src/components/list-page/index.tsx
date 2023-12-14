"use client";
import { Button } from "@/components/ui/button";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { CircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getTable } from "@/services/panel";
import { useDatabase } from "@/hooks/use-database";
import { useLanguage } from "@/contexts/language-context";
import { useTranslate } from "@/langs";
import { columns } from "@/components/data-table/columns";
import { DataTable } from "../data-table/data-table";

export default function ListPage({ slug, data }: { slug: string; data: any }) {
  const { table, filterables, searchables } = useDatabase(slug);
  const tableName = table?.name || "";
  const tableColumns = columns(slug, table?.columns || []);
  const { translate } = useTranslate();

  const [tableData, setTableData] = useState(data);
  useEffect(() => {
    setTableData(data);
  }, [data]);

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
            icon: CircleIcon,
          };
        }),
      };
    }
  });

  const searchablesData = searchables;
  return (
    <>
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">{translate(tableName)}</h3>
        {table?.can_create !== false && (
          <div>
            <Button asChild>
              <Link href={"/dashboard/" + tableName + "/ekle"}>
                <PlusCircledIcon className="w-4 h-4 mr-2" />
                Yeni {translate(tableName)} ekle
              </Link>
            </Button>
          </div>
        )}
      </div>
      <div className="w-full py-10">
        {tableData && (
          <DataTable
            tableName={tableName}
            columns={tableColumns}
            data={tableData}
            filterables={filterablesData}
            searchables={searchablesData}
            databaseTableColumns={table?.columns || []}
          />
        )}
      </div>
    </>
  );
}
