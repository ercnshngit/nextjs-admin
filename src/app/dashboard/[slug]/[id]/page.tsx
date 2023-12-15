"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslate } from "@/langs";
import { getTableItem } from "@/services/panel";
import { ArrowLeftIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { useTable } from "@/hooks/use-database";
import ColumnCellFactory from "@/components/data-table/column-cell-factory";

export default function MasrafContent({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const { translate } = useTranslate();

  const { id, slug } = params;
  const { table } = useTable(slug);
  const tableName = table?.name || "";
  const { data, error } = useQuery([tableName + "/" + id], () =>
    getTableItem({ tableName: tableName, id: Number(id) })
  );
  return (
    <div className="container py-10 mx-auto">
      <div className="flex justify-between mb-4">
        <div className="flex flex-row items-center space-x-4">
          <Button asChild>
            <Link href={"/" + tableName}>
              <ArrowLeftIcon className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline"> Geri </span>
            </Link>
          </Button>
          <h2 className="text-lg font-medium">
            {id}{" "}
            <span className="hidden md:inline">
              Numaralı {translate(tableName)}
            </span>
          </h2>
        </div>
        {table?.can_update !== false && (
          <div>
            <Button asChild>
              <Link href={"/" + tableName + "/" + id + "/update"}>
                <PlusCircledIcon className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">
                  {" "}
                  {id} Numaralı {translate(tableName)} Düzenle
                </span>
              </Link>
            </Button>
          </div>
        )}
      </div>
      <Card className="min-h-[700px]">
        <CardContent>
          <div className="py-10">
            {data &&
              table?.columns?.map((column) => {
                return (
                  <div
                    key={column.name}
                    className="flex gap-2 py-2 border-b border-gray-200"
                  >
                    <h1 className="items-center font-medium">
                      {translate(tableName + "/" + column.name)}:{" "}
                    </h1>
                    <ColumnCellFactory
                      column={column}
                      value={data[column.name]}
                    />
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
