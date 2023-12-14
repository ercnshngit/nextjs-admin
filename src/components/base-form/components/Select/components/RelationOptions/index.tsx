"use client";
import { useDatabase } from "@/hooks/use-database";
import { getTableWhere } from "@/services/dashboard";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { Option } from "@/types/config";
import { useQuery } from "@tanstack/react-query";

export default function RelationOptions({
  field,
}: {
  field: DataBaseTableColumnDto;
}) {
  const { table: joinedTable } = useDatabase(
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
      getTableWhere({
        tableName: joinedTable.name,
        where: [{ key: "table_id", value: field.column_relations[0].table_id }],
      }),
    { enabled: !!joinedTable }
  );

  const options: Option[] =
    data !== ""
      ? data?.map((item: any) => {
          return {
            label: item.name,
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
