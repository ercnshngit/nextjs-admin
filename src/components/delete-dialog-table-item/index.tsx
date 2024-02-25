import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BsFillTrashFill } from "react-icons/bs";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslate } from "@/langs";
import { DELETE_TABLE_ITEM } from "@/types/common-table-api";
import { deleteTableItem } from "@/services/dashboard";
import DeleteDialog from "../delete-dialog-base";
export default function DeleteItem({ open, setOpen, tableName, id }: any) {
  const { translate } = useTranslate();

  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (deleteData: DELETE_TABLE_ITEM) => deleteTableItem(deleteData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([tableName]);
        console.log("deleteMutation");
        router.push("/dashboard/" + tableName);
        router.refresh();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDelete = (id: number) => {
    deleteMutation.mutate({
      id: id,
      tableName: tableName,
    });
  };
  return (
    <DeleteDialog
      title={translate("MENU_DELETE_ALERT_TITLE")}
      open={open}
      setOpen={setOpen}
      description={translate("MENU_DELETE_ALERT_DESCRIPTION")}
      handleDelete={handleDelete}
    />
  );
}
