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
      <div>
        <label htmlFor={field.name}>
          {translate(field.name.split("/")[3])}
        </label>
        <p className="text-xs text-gray-400">{translate(field.description)}</p>
      </div>
    );
  } else {
    return (
      <div>
        <label htmlFor={field.name}>{translate(field.name)}</label>
        <p className="text-xs text-gray-400">{translate(field.description)}</p>
      </div>
    );
  }
}
