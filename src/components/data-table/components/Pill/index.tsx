import { getTable } from "@/services/dashboard";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import { checkError } from "@/utils/error-handling";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Pill({
  value,
  column,
}: {
  value: any;
  column: DataBaseTableColumnDto;
}) {
  if (column.options && column.options?.length > 0) {
    return (
      <div className="px-2 py-1 text-xs bg-red-300 rounded-full">
        {
          column.options?.find(
            (option) => String(option.value) === String(value)
          )?.label
        }
      </div>
    );
  } else {
    return <RelationPill value={value} column={column} />;
  }
}

function RelationPill({
  value,
  column,
}: {
  value: any;
  column: DataBaseTableColumnDto;
}) {
  const { data: joinedTableData, error } = useQuery(
    [column.column_relations[0].referenced_table.name],
    () =>
      getTable({ tableName: column.column_relations[0].referenced_table.name })
  );
  const valueItem =
    joinedTableData.find(
      (joinedTableItem: any) => joinedTableItem.id === value
    ) ||
    joinedTableData.find(
      (joinedTableItem: any) => joinedTableItem?.code === value
    );
  return (
    <div>
      {column.input_type?.name === "relation" ? (
        <div className="flex flex-wrap gap-1">
          {column.column_relations[0].relation_type.name === "many-to-many"
            ? checkError(() => JSON.parse(value))?.map(
                (item: any, index: number) => {
                  const joinedTableColumn = joinedTableData.find(
                    (joinedTableItem: any) => {
                      // TODO: Key column kullanmak lazım display bi de
                      return (
                        joinedTableItem.id ===
                        item[
                          column.column_relations[0].referenced_table.name +
                            "_id"
                        ]
                      );
                    }
                  );

                  return (
                    <div
                      key={index}
                      className="px-2 py-1 text-xs bg-red-300 rounded-full"
                    >
                      {/* buraya da display column lazım */}
                      {joinedTableColumn?.name ||
                        joinedTableColumn?.title ||
                        joinedTableColumn?.key}
                    </div>
                  );
                }
              )
            : column.column_relations[0].relation_type.name ===
                "one-to-many" && (
                <div className="px-2 py-1 text-xs bg-red-300 rounded-full">
                  {valueItem?.name ||
                    valueItem?.title ||
                    valueItem?.key ||
                    valueItem?.code ||
                    JSON.stringify(valueItem) ||
                    "Bulunamadı"}
                </div>
              )}
        </div>
      ) : (
        <div className="px-2 py-1 text-xs bg-red-300 rounded-full">{value}</div>
      )}
    </div>
  );
}
