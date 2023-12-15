"use client";
import BaseForm from "@/components/base-form";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { createTableItem } from "@/services/panel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Form({ table }: { table: DatabaseTableDto }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<any>({});

  const queryClient = useQueryClient();
  const createMutation = useMutation(
    (data: {}) =>
      createTableItem({
        tableName: table.name,
        data: Object.entries(data).map(([key, value]) => ({ key, value })),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([table.name]);
        toast.success("Kayıt başarıyla oluşturuldu");
        reset();
      },
      onError: (error) => {
        //@ts-ignore
        toast.error(error.message);
      },
    }
  );
  const onSubmit: SubmitHandler<any> = (data) => {
    createMutation.mutate(data);
  };

  return (
    <>
      <BaseForm
        control={control}
        setValue={setValue}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        table={table}
        errors={errors}
        register={register}
        formType="create_crud_option"
      />
    </>
  );
}
