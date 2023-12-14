import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { ComponentPropDto } from "@/services/dto/prop.dto";
import React from "react";

export default function TextInput({
  blockComponentProp,
  defaultValue,
  setValue,
}: {
  blockComponentProp: ComponentPropDto;
  defaultValue?: any;
  setValue: any;
}) {
  return (
    <div className="flex w-full  flex-col gap-2">
      <label htmlFor={blockComponentProp.prop.key}>
        {blockComponentProp.prop.key}
      </label>

      <input
        className="rounded-md border w-full border-gray-300 p-2"
        type="text"
        id={blockComponentProp.prop.key}
        value={blockComponentProp.value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
