import { DATABASE_TABLE, DATABASE_TABLE_COLUMN } from "@/config/general";
import { useTranslate } from "@/langs";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Label from "../Label";

export default function String({
  field,
  table,
  register,
  errors,
  defaultValue,
}: {
  field: DATABASE_TABLE_COLUMN;
  table: DATABASE_TABLE;
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
          required: field.required === false ? false : true,
        })}
        defaultValue={defaultValue}
      />
      {errors[field.name] && <span>Bu alan gereklidir</span>}
    </div>
  );
}
