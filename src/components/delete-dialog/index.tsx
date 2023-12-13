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
import { deleteTableItem } from "@/services/panel";
import { DELETE_TABLE_ITEM } from "@/types/panel";
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
        router.push("/" + tableName);
        router.refresh();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDelete = (id: number, tableName: string) => {
    deleteMutation.mutate({
      id: id,
      tableName: tableName,
    });
  };
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {translate("MENU_DELETE_ALERT_TITLE")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {translate("MENU_DELETE_ALERT_DESCRIPTION")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {translate("MENU_DELETE_ALERT_CANCEL")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setOpen(false);
                handleDelete(Number(id), tableName);
              }}
            >
              {translate("MENU_DELETE_ALERT_CONFIRMATION")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
