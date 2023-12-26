import { useTranslate } from "@/langs";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import React from "react";

export default function Label({
  field,
  table,
}: {
  field: DataBaseTableColumnDto;
  table: Partial<DatabaseTableDto>;
}) {
  const { translate } = useTranslate();

  if (field?.name?.split("/")[0] === "relation") {
    return (
      <label htmlFor={field.name}>{translate(field.name.split("/")[3])}</label>
    );
  } else {
    return <label htmlFor={field.name}>{translate(field.name)}</label>;
  }
}
