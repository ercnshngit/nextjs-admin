import { useTranslate } from "@/langs";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Label from "../Label";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { slugify } from "@/utils/slugify";

export default function Slugify({
  field,
  table,
  register,
  errors,
  defaultValue,
}: {
  field: DataBaseTableColumnDto;
  table: DatabaseTableDto;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  defaultValue?: any;
}) {
  return (
    <div className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200">
      <Label field={field} table={table} />
      <input
        className="px-2 py-1 border border-gray-200 rounded-md "
        {...register(field.name, {
          required: field.is_required === false ? false : true,
        })}
        defaultValue={slugify(defaultValue)}
      />
      {errors[field.name] && <span>Bu alan gereklidir</span>}
    </div>
  );
}
