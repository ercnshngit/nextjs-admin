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
import { translate } from "@/langs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMenu } from "@/services/menu";
import { toast } from "react-toastify";

export default function MenuList({
  data,
  onRemove,
  handleUpdate,
}: {
  data: { menus: { menu: MENU_ITEM }[] };
  onRemove: (id: UniqueIdentifier) => void;
  handleUpdate: (id: UniqueIdentifier, parentId: UniqueIdentifier) => void;
}) {
  const [open, setOpen] = useState(false);
  const [currentRemoveId, setCurrentRemoveId] = useState<UniqueIdentifier>();

  function handleRemove(id: UniqueIdentifier) {
    setOpen(true);
    setCurrentRemoveId(id);
    return false;
  }
  const createMenuTree = useCallback(function createMenuTree(
    data: { menus: { menu: MENU_ITEM }[] },
    parentId: number
  ): TreeItems {
    return data?.menus
      ?.filter(
        (menu: { menu: MENU_ITEM }) => menu.menu.menu_belong_id === parentId
      )
      .map((menu: { menu: MENU_ITEM }) => {
        return {
          id: menu.menu.title,
          uniqueId: menu.menu.id,
          collapsed: true,
          children: createMenuTree(data, menu.menu.id),
        };
      });
  },
  []);
  //TODO: menü güncellenince güncellencek
  const [menuData, setMenuData] = useState<TreeItems>(
    data?.menus
      ?.filter(
        (menu: { menu: MENU_ITEM }) =>
          menu.menu.menu_belong_id === 0 || menu.menu.menu_belong_id === null
      )
      .map((menu: { menu: MENU_ITEM }) => {
        return {
          id: menu.menu.title,
          uniqueId: menu.menu.id,
          collapsed: true,
          children: createMenuTree(data, menu.menu.id),
        };
      })
  );

  useEffect(() => {
    setMenuData(
      data?.menus
        ?.filter(
          (menu: { menu: MENU_ITEM }) =>
            menu.menu.menu_belong_id === 0 || menu.menu.menu_belong_id === null
        )
        .map((menu: { menu: MENU_ITEM }) => {
          return {
            id: menu.menu.title,
            uniqueId: menu.menu.id,
            collapsed: true,
            children: createMenuTree(data, menu.menu.id),
          };
        })
    );
  }, [data]);

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
