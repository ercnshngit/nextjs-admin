"use client";
import { useTable } from "@/hooks/use-database";
import { getTable, getTableWhere } from "@/services/dashboard";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { useQuery } from "@tanstack/react-query";

export default function RelationOptions({
  field,
}: {
  field: DataBaseTableColumnDto;
}) {
  const { table: joinedTable } = useTable(
    field.column_relations[0].referenced_table.name
  )!;
  if (!joinedTable?.name) return null;
  return <Options joinedTable={joinedTable} field={field} />;
}

function Options({
  joinedTable,
  field,
}: {
  joinedTable: DatabaseTableDto;
  field: DataBaseTableColumnDto;
}) {
  const { data, error } = useQuery(
    [joinedTable.name],
    () =>
      field.column_relations[0].referenced_table.name === "type"
        ? getTableWhere({
            tableName: joinedTable.name,
            where: [
              { key: "table_id", value: field.column_relations[0].table_id },
            ],
          })
        : getTable({
            tableName: joinedTable.name,
          }),
    { enabled: !!joinedTable }
  );

  const options: { label: string; value: string }[] =
    data !== ""
      ? field.column_relations[0].referenced_table.name === "language"
        ? data?.map((item: any) => {
            return {
              label: item.name,
              value: item.code,
            };
          })
        : data?.map((item: any) => {
            return {
              label: field.column_relations[0].referenced_table.display_column
                ? item[
                    field.column_relations[0].referenced_table.display_column
                      .name as any
                  ]
                : item.name,
              value: item.id,
            };
          })
      : [];

  return (
    <>
      {options?.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </>
  );
}
