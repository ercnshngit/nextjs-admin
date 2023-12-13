import { useTranslate } from "@/langs";
import { Column, Database_Table } from "@/types/config";
import React from "react";

export default function Label({
  field,
  table,
}: {
  field: Column;
  table: Partial<Database_Table>;
}) {
  const { translate } = useTranslate();

  if (field?.name?.split("/")[0] === "relation") {
    return (
      <label htmlFor={field.name}>
        {translate(table.name + "/" + field.name.split("/")[3])}
      </label>
    );
  } else {
    return (
      <label htmlFor={field.name}>
        {translate(table.name + "/" + field.name)}
      </label>
    );
  }
}
