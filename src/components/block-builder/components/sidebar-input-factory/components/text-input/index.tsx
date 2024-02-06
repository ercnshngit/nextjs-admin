import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { ComponentPropDto } from "@/services/dto/prop.dto";
import React from "react";

export default function TextInput({
  propKey,
  value,
  setValue,
  ...rest
}: {
  propKey: string;
  value: any;
  setValue: any;
}) {
  return (
    <input
      className="w-full p-2 border border-gray-300 rounded-md"
      type="text"
      id={propKey}
      defaultValue={value}
      onChange={(e) => setValue(e.target.value)}
      {...rest}
    />
  );
}
