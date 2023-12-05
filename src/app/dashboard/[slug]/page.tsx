"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { translate } from "@/langs";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { CircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { columns } from "./components/data-table/columns";
import { DataTableExpandable } from "./components/data-table/data-table";
import {
  getDatabaseTable,
  getDatabaseTableColumnsFilterable,
  getDatabaseTableColumnsSearchable,
} from "@/config/general";
import { getTable } from "@/services/panel";

export default function Masraf({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const table = getDatabaseTable(slug);
  const tableName = table?.name || "";
  const tableColumns = columns(tableName);

  const { data, error } = useQuery([tableName], () =>
    getTable({ tableName: tableName })
  );

  const [tableData, setTableData] = useState(data);
  useEffect(() => {
    setTableData(data);
  }, [data]);

  const filterables = getDatabaseTableColumnsFilterable(tableName)?.map(
    (filterable) => {
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
    }
  );

  const searchables = getDatabaseTableColumnsSearchable(tableName);
  if (error) return <div>error</div>;
  return (
    <div className="container flex-1 py-10 mx-auto overflow-hidden ">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">{translate(tableName)}</h3>
        {table?.canCreate !== false && (
          <div>
            <Button asChild>
              <Link href={"/" + tableName + "/ekle"}>
                <PlusCircledIcon className="w-4 h-4 mr-2" />
                Yeni {translate(tableName)} ekle
              </Link>
            </Button>
          </div>
        )}
      </div>
      <div className="w-full py-10">
        {tableData && (
          <DataTableExpandable
            tableName={tableName}
            columns={tableColumns}
            data={tableData}
            filterables={filterables}
            searchables={searchables}
          />
        )}
      </div>
    </div>
  );
}
