"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import Label from "../Label";
import RelationOptions from "./components/RelationOptions";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";

export default function Select({
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
  defaultValue?: string;
}) {
  return (
    <div
      key={field.name}
      className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200"
    >
      <Label field={field} table={table} />
      <select
        className="px-2 py-1 border border-gray-200 rounded-md "
        {...register(field.name, {
          required: field.is_required === false ? false : true,
        })}
        defaultValue={defaultValue}
      >
        <option value=""></option>

        {field.options && field.options.length > 0 ? (
          field.options?.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })
        ) : (
          <RelationOptions field={field} />
        )}
      </select>
      {errors[field.name] && <span>Bu alan gereklidir</span>}
    </div>
  );
}
