"use client";

import { Column, Database_Table, Option } from "@/types/config";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Label from "../Label";
import RelationOptions from "./components/RelationOptions";

export default function Select({
  field,
  table,
  register,
  errors,
  defaultValue,
}: {
  field: Column;
  table: Database_Table;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  defaultValue?: string;
}) {
  return (
    <div
      key={field.name}
      className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200"
    >
      <Label field={field} table={table} />
      {defaultValue}
      <select
        className="px-2 py-1 border border-gray-200 rounded-md "
        {...register(field.name, {
          required: field.is_required === false ? false : true,
        })}
        defaultValue={defaultValue}
      >
        {!field.options ? (
          <RelationOptions field={field} />
        ) : (
          field.options?.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })
        )}
      </select>
      {errors[field.name] && <span>Bu alan gereklidir</span>}
    </div>
  );
}
