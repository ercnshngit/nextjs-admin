import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { ComponentPropDto } from "@/services/dto/prop.dto";
import React from "react";

export default function TextInput({
  key,
  value,
  setValue,
  ...rest
}: {
  key: string;
  value: any;
  setValue: any;
}) {
  return (
    <input
      className="rounded-md border w-full border-gray-300 p-2"
      type="text"
      id={key}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...rest}
    />
  );
}
