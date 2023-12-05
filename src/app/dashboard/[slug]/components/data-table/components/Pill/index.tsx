import { DATABASE_TABLE_COLUMN, getDatabaseTable } from "@/config/general";
import { getTable } from "@/services/panel";
import { checkError } from "@/utils/error-handling";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Pill({
  value,
  column,
}: {
  value: any;
  column: DATABASE_TABLE_COLUMN;
}) {
  const { data: joinedTableData, error } = useQuery(
    [column.relation!.table],
    () => getTable({ tableName: column.relation!.table })
  );

  const joinedTable = getDatabaseTable(column.relation!.table!);

  return (
    <div>
      {column.inputType === "relation" ? (
        <div className="flex flex-wrap gap-1">
          {column.relation!.type === "many"
            ? checkError(() => JSON.parse(value))?.map(
                (item: any, index: number) => {
                  const joinedTableColumn = joinedTableData.find(
                    (joinedTableItem: any) => {
                      return (
                        joinedTableItem[column.relation!.keyColumn] ===
                        item[column.relation!.pivotTableForeignKeyColumn!]
                      );
                    }
                  );

                  return (
                    <div
                      key={index}
                      className="px-2 py-1 text-xs bg-red-300 rounded-full"
                    >
                      {joinedTableColumn[column.relation!.displayColumn!]}
                    </div>
                  );
                }
              )
            : column.relation!.type === "one" && (
                <div>
                  {joinedTableData.find(
                    (joinedTableItem: any) =>
                      joinedTableItem[column.relation!.keyColumn] === value
                  )?.[column.relation!.displayColumn!] || "Bulunamadı"}
                </div>
              )}
        </div>
      ) : (
        <div className="px-2 py-1 text-xs bg-red-300 rounded-full">{value}</div>
      )}
    </div>
  );
}
