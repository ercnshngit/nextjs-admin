import React from "react";
import dynamic from "next/dynamic";
import {
  Controller,
  FieldErrors,
  UseFormRegister,
  useController,
} from "react-hook-form";
import Label from "../Label";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";

const RichTextBox = ({
  field,
  table,
  register,
  errors,
  control,
  defaultValue,
  ...props
}: {
  field: DataBaseTableColumnDto;
  table: DatabaseTableDto;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  defaultValue?: any;
  control: any;
}) => {
  return (
    <div className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200">
      <Label field={field} table={table} />

      <Controller
        name={field.name}
        control={control}
        render={({ field }) => <div></div>}
      />
      {errors[field.name] && <span>Bu alan gereklidir</span>}
    </div>
  );
};

export default RichTextBox;
