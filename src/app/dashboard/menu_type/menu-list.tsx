import React, { useCallback, useEffect, useState } from "react";
import { SortableTree } from "@/components/dndkit-sortable-list/sortable/tree/SortableTree";
import { TreeItems } from "@/components/dndkit-sortable-list/sortable/tree/types";
import { MENU_ITEM } from "@/types/menus";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useTranslate } from "@/langs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteMenu } from "@/services/dashboard";

export default function MenuList({
  data,
  onRemove,
  handleUpdate,
}: {
  data: MENU_ITEM[];
  onRemove: (id: UniqueIdentifier) => void;
  handleUpdate: any;
}) {
  const [open, setOpen] = useState(false);
  const [currentRemoveId, setCurrentRemoveId] = useState<UniqueIdentifier>();

  function handleRemove(id: UniqueIdentifier) {
    setOpen(true);
    setCurrentRemoveId(id);
    return false;
  }
  const assingMenuTreeProperties = useCallback(
    function assingMenuTreeProperties(data: MENU_ITEM[]): TreeItems {
      return data.map((menu: MENU_ITEM) => {
        return {
          id: menu.title,
          uniqueId: menu.id,
          collapsed: true,
          children: assingMenuTreeProperties(menu.submenus),
        };
      });
    },
    []
  );

  const [menuData, setMenuData] = useState<TreeItems>(
    assingMenuTreeProperties(data)
  );

  useEffect(() => {
    setMenuData(assingMenuTreeProperties(data));
  }, [data, assingMenuTreeProperties]);

  const { translate } = useTranslate();

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (data: number) => deleteMenu(data),
    onSuccess: (response) => {
      toast.success("Başarıyla silindi");
      queryClient.invalidateQueries(["menu"]);
    },
  });
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
                deleteMutation.mutate(currentRemoveId as number);
              }}
            >
              {translate("MENU_DELETE_ALERT_CONFIRMATION")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {menuData && (
        <SortableTree
          collapsible
          indicator
          removable
          defaultItems={menuData}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}
