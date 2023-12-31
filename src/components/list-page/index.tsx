"use client";
import { Button } from "@/components/ui/button";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { CircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { columns } from "@/components/data-table/columns";
import { useTable } from "@/hooks/use-database";
import { useTranslate } from "@/langs";

import { DataTable } from "../data-table/data-table";
import { useSearchParams } from "next/navigation";

export default function ListPage({ slug, data }: { slug: string; data: any }) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const filterBy = searchParams.get("filterBy");
  const filterValue = searchParams.get("filterValue");

  const { table, filterables, searchables } = useTable(slug);

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
            icon: null,
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
            data={
              filterBy && filterValue
                ? tableData.filter(
                    (data: any) =>
                      String(data[filterBy as any]) === String(filterValue)
                  )
                : tableData
            }
            page={page ? parseInt(page) : 1}
            filterables={filterablesData}
            searchables={searchablesData}
            databaseTableColumns={table?.columns || []}
          />
        )}
      </div>
    </>
  );
}
