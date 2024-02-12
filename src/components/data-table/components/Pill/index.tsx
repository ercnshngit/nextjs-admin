import { Badge } from "@/components/ui/badge";
import { getTable } from "@/services/dashboard";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

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
  } else if (column.column_relations[0]?.referenced_table) {
    return <RelationPill value={value} column={column} />;
  } else {
    return <Badge variant={"secondary"}>{value}</Badge>;
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
          <Link
            href={`/dashboard/${column.column_relations[0].referenced_table.name}/${valueItem?.id}`}
          >
            <Badge variant={"secondary"}>
              {column.column_relations[0].referenced_table.display_column
                ? valueItem?.[
                    column.column_relations[0].referenced_table.display_column
                      .name
                  ]
                : valueItem?.name ||
                  valueItem?.title ||
                  valueItem?.slug ||
                  valueItem?.key ||
                  valueItem?.code ||
                  JSON.stringify(valueItem) ||
                  "Bulunamadı"}
            </Badge>
          </Link>
        </div>
      ) : (
        <Badge>{value}</Badge>
      )}
    </div>
  );
}
