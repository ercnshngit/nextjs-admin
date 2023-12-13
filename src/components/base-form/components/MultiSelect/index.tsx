import { DATABASE_TABLE, DATABASE_TABLE_COLUMN } from "@/config/general";
import { useTranslate } from "@/langs";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Label from "../Label";

export default function MultiSelect({
  field,
  table,
  register,
  errors,
}: {
  field: DATABASE_TABLE_COLUMN;
  table: Partial<DATABASE_TABLE>;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}) {
  return (
    <div
      key={field.name}
      className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200"
    >
      <Label field={field} table={table} />

      <select
        className="px-2 py-1 border border-gray-200 rounded-md "
        {...register(field.name, { required: true })}
        multiple
      >
        {field.options?.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      {errors[field.name] && <span>Bu alan gereklidir</span>}
    </div>
  );
}
