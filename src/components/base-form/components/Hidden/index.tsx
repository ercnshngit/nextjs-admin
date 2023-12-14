import { useUser } from "@/hooks/useAuth";
import { useTranslate } from "@/langs";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export default function Hidden({
  field,
  table,
  register,
  errors,
  defaultValue,
}: {
  field: DataBaseTableColumnDto;
  table: Partial<DatabaseTableDto>;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  defaultValue?: string;
}) {
  return (
    <input
      key={field.name}
      type="hidden"
      {...register(field.name, { required: field.is_required })}
      defaultValue={defaultValue}
    />
  );
}
