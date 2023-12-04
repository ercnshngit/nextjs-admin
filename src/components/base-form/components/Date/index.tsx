import { DATABASE_TABLE, DATABASE_TABLE_COLUMN } from "@/config/general";
import { translate } from "@/langs";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Label from "../Label";

export default function Date({
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

      <input
        type="date"
        className="px-2 py-1 border border-gray-200 rounded-md "
        {...register(field.name, { required: true })}
      />
      {errors[field.name] && <span>Bu alan gereklidir</span>}
    </div>
  );
}
