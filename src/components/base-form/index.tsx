import { useAuth, useUser } from "@/hooks/useAuth";
import { useTranslate } from "@/langs";
import React from "react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import FormInputFactory from "./form-input-factory";
import { useQuery } from "@tanstack/react-query";
import { getTableItem } from "@/services/panel";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";

export default function BaseForm(props: {
  handleSubmit: any;
  onSubmit: any;
  table: DatabaseTableDto;
  errors: FieldErrors;
  register: UseFormRegister<any>;
  formType: "create_crud_option" | "update_crud_option";
  id?: number;
  setValue: any;
  watch?: any;
  control: any;
  customInput?: {
    for: string;
    component: React.FC<any>;
  }[];
}) {
  const { translate } = useTranslate();

  const {
    handleSubmit,
    onSubmit,
    table,
    errors,
    register,
    formType,
    id,
    setValue,
    customInput,
    watch,
    control,
  } = props;

  const { data, error } = useQuery([table.name + "/" + id], () =>
    getTableItem({ tableName: table.name, id: Number(id) })
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap w-full gap-4"
    >
      {table?.columns &&
        table.columns
          .filter((field) => (field.is_hidden ? false : true))
          .map((field) => (
            <FormInputFactory
              key={field.name}
              formType={formType}
              errors={errors}
              field={field}
              register={register}
              table={table}
              id={id}
              watch={watch}
              setValue={setValue}
              customInput={customInput}
              control={control}
              {...(formType === "create_crud_option" && {
                defaultValue: data[0][field.name] || field.name,
              })}
            />
          ))}

      <button
        type="submit"
        className="w-full px-2 py-1 text-white bg-blue-500 rounded-md"
      >
        {translate("FORM_SUBMIT_" + formType?.toUpperCase())}
      </button>
    </form>
  );
}
