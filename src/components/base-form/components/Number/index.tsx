import { useTranslate } from "@/langs";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Label from "../Label";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";

export default function Number({
  field,
  table,
  register,
  errors,
}: {
  field: DataBaseTableColumnDto;
  table: Partial<DatabaseTableDto>;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}) {
  return (
    <div
      key={field.name}
      className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200"
    >
      <Label field={field} table={table} />

      <input
        className="px-2 py-1 border border-gray-200 rounded-md "
        {...register(field.name, { required: field.is_required })}
      />
      {errors[field.name] && <span>Bu alan gereklidir</span>}
    </div>
  );
}
