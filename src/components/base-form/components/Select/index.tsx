import { translate } from "@/langs";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Label from "../Label";
import { useQuery } from "@tanstack/react-query";
import { getTable } from "@/services/panel";
import { Column, Database_Table } from "@/types/config";

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
        {/* {field ? (
          <RelationOptions field={field} />
        ) : (
          field.?.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })
        )} */}
      </select>
      {errors[field.name] && <span>Bu alan gereklidir</span>}
    </div>
  );
}

// function RelationOptions({ field }: { field: Column }) {
//   const joinedTable = getDatabaseTable(field.relation!.table)!;

//   const { data, error } = useQuery([joinedTable.name], () =>
//     getTable({ tableName: joinedTable.name })
//   );

//   console.log(data);

//   const options: OPTION[] =
//     data !== ""
//       ? data?.map((item: any) => {
//           return {
//             label: item[field.relation!.displayColumn!],
//             value: item[field.relation!.keyColumn!],
//           };
//         })
//       : [];

//   return (
//     <>
//       {options?.map((option) => {
//         return (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         );
//       })}
//     </>
//   );
// }
