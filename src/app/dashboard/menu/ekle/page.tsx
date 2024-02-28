"use client";
import CreatePage from "@/components/dynamic-crud-layouts/create-page";
import { useTable } from "@/hooks/use-database";
import { createMenu } from "@/services/menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import CreateFormBase from "../../../../components/base-form/create-form-base";

export default function Ekle() {
  const { table } = useTable("menu");
  const tableName = table?.name || "";

  const queryClient = useQueryClient();

  const createMutation = useMutation(
    (data: any) =>
      createMenu({
        data: {
          ...data,
          type_id: Number(data.type_id),
          status: Number(data.status),
          menu_belong_id: Number(data.menu_belong_id),
        },
      }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["menu"]);
        toast.success("Kayıt başarıyla oluşturuldu");
      },
      onError: (error) => {
        //@ts-ignore
        toast.error(error.message);
      },
    }
  );

  return (
    <CreatePage tableName={tableName} goBackUrl="/dashboard/menu_type">
      {table && (
        <CreateFormBase table={table} customCreateMutation={createMutation} />
      )}
    </CreatePage>
  );
}
