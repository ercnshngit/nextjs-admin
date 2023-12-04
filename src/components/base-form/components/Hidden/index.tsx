import { DATABASE_TABLE, DATABASE_TABLE_COLUMN } from "@/config/general";
import { useUser } from "@/hooks/useAuth";
import { translate } from "@/langs";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export default function Hidden({
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
  const user = useUser();

  const defaultValue =
    field.default === "user.id" && user && user.sub ? (user.sub as any).id : "";
  return (
    <input
      key={field.name}
      type="hidden"
      {...register(field.name, { required: true })}
      defaultValue={defaultValue}
    />
  );
}
