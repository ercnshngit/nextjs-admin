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
      className="rounded-md border w-full border-gray-300 p-2"
      type="text"
      id={propKey}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...rest}
    />
  );
}
