"use client";
import { useDatabase } from "@/hooks/use-database";
import { getTableWhere } from "@/services/dashboard";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import { Column, Database_Table, Option } from "@/types/config";
import { useQuery } from "@tanstack/react-query";

export default function RelationOptions({
  field,
}: {
  field: DataBaseTableColumnDto;
}) {
  const { table: joinedTable } = useDatabase(field.relation!.table)!;
  if (!joinedTable) return null;
  return <Options joinedTable={joinedTable} field={field} />;
}

function Options({
  joinedTable,
  field,
}: {
  joinedTable: Database_Table;
  field: Column;
}) {
  const { data, error } = useQuery(
    [joinedTable?.name],
    () =>
      getTableWhere({
        tableName: joinedTable.name,
        where: [{ key: "table_id", value: field.relation.table_id }],
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
