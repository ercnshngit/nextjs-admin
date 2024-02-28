import { cn } from "@/libs/utils";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { ComponentPropDto } from "@/services/dto/prop.dto";
import React from "react";

export default function TextInput({
  propKey,
  value,
  setValue,
  className,
  ...rest
}: {
  propKey: string;
  value: any;
  setValue: any;
  className?: string;
}) {
  return (
    <input
      className={cn(
        "w-full p-2 border border-gray-300 text-black rounded-md",
        className
      )}
      type="text"
      id={propKey}
      defaultValue={value}
      onChange={(e) => setValue(e.target.value)}
      {...rest}
    />
  );
}
