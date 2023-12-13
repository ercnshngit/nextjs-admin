"use client";
import { useTranslate } from "@/langs";
import React, { useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import BaseForm from "@/components/base-form";
import { useMutation } from "@tanstack/react-query";
import { updateTableItem } from "@/services/panel";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { UPDATE_TABLE_ITEM } from "@/types/panel";
import { useRouter } from "next/navigation";
import { queryClient } from "@/libs/react-query";
import { DATABASE_TABLE } from "@/config/general";

export default function Form({
  table,
  id,
}: {
  table: DATABASE_TABLE;
  id: number;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<any>();

  const router = useRouter();
  const updateMutation = useMutation(
    (data: UPDATE_TABLE_ITEM) =>
      updateTableItem({ tableName: table.name, id: id, data: data }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [table.name, table.name + "/" + id],
        });
        toast.success("Kayıt başarıyla güncellendi");
        router.push("/" + table.name);
      },
    }
  );

  const updateRelationMutation = useMutation(
    (data: UPDATE_TABLE_ITEM) =>
      updateTableItem({
        tableName: data.tableName,
        id: data.id,
        data: data.data,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [table.name],
        });
        toast.success("Kayıt başarıyla güncellendi");
        console.log("güncellendi");
      },
    }
  );

  const onSubmit: SubmitHandler<any> = (data) => {
    if (table.columns.some((column) => column.inputType === "relation")) {
      const relationData = Object.keys(data).filter(
        (key: any) => key.split("/")[0] === "relation"
      );

      relationData.forEach((relation) => {
        const relationTableName = relation.split("/")[1];
        const relationTableItemId = Number(relation.split("/")[2]);
        const relationTableData = data[relation];
        const relationTableColumnName = relation.split("/")[3];
        updateRelationMutation.mutate({
          tableName: relationTableName,
          id: relationTableItemId,
          data: { [relationTableColumnName]: relationTableData },
        });
      });
      const otherData = Object.keys(data).filter(
        (key) => key.split("/")[0] !== "relation"
      );
      const fullData: UPDATE_TABLE_ITEM = {} as UPDATE_TABLE_ITEM;
      otherData.forEach((key) => {
        // @ts-ignore
        fullData[key] = data[key];
      });
      updateMutation.mutate(fullData);
    } else {
      updateMutation.mutate(data);
    }
  };

  return (
    <BaseForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      table={table}
      errors={errors}
      register={register}
      formType="update"
      id={Number(id)}
      setValue={setValue}
    />
  );
}
