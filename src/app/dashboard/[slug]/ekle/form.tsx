"use client";
import { translate } from "@/langs";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import BaseForm from "@/components/base-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTableItem } from "@/services/panel";
import { toast } from "react-toastify";
import { Database_Table } from "@/types/config";

export default function Form({ table }: { table: Database_Table }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
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
        formType="create"
      />
    </>
  );
}
