"use client";
import {
  getGeneralBySlug,
  getGeneralSlugs,
  getTable,
} from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function ItemList({ datasetInfo }: { datasetInfo: string }) {
  console.log(datasetInfo);
  const [table, name, columnsString] =
    datasetInfo !== "" ? datasetInfo.split("-") : [null, null, null];
  const columns = columnsString?.split(",");
  const { data } = useQuery(
    [table, name],
    () =>
      name &&
      (table === "table"
        ? getTable({
            tableName: name,
          })
        : getGeneralBySlug(name)),
    { enabled: !!name }
  );
  return (
    <div>
      {columns &&
        data.map((item: any) => (
          <div key={item.id} className="bg-gray-300 p-1 mb-1">
            {columns.map((column) => (
              <div key={column} className="bg-gray-100 p-1 mb-1">
                <h1 className="font-bold">{column}</h1>
                <p>{item[column]}</p>
              </div>
            ))}
            <hr />
          </div>
        ))}
    </div>
  );
}
