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
export default function DeleteDialog({
  title,
  open,
  setOpen,
  description,
  handleDelete,
}: {
  title?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description?: string;
  handleDelete: any;
}) {
  const { translate } = useTranslate();
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {title || "Silmek istediginizden emin misiniz?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {description ||
                "Bu işlem geri alınamaz ve bu veriye bagli olan diger yerlerde problem olusabilir. Silmek istediginizden emin misiniz?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {translate("MENU_DELETE_ALERT_CANCEL")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setOpen(false);
                handleDelete();
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
