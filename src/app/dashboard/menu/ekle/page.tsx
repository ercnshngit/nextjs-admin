"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import CreateFormBase from "../../../../components/base-form/create-form-base";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTableItem } from "@/services/common-table-api";
import { useTranslate } from "@/langs";
import { useTable } from "@/hooks/use-database";
import useSearchParams from "@/hooks/use-search-params";
import CreatePage from "@/components/dynamic-crud-layouts/create-page";
import { toast } from "react-toastify";
import { createMenu } from "@/services/dashboard";

export default function Ekle() {
  const { table } = useTable("menu");
  const tableName = table?.name || "";

  const queryClient = useQueryClient();

  const createMutation = useMutation(
    (data: {}) => createMenu({ data }),

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
