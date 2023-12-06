"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTableItem } from "@/services/panel";
import { DELETE_TABLE_ITEM, UPDATE_TABLE_ITEM } from "@/types/panel";
import { toast } from "react-toastify";
import DeleteItem from "@/components/delete-dialog";

interface DataTableRowActionsProps {
  row: any;
  slug: string;
}

export function DataTableRowActions({ row, slug }: DataTableRowActionsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (deleteData: DELETE_TABLE_ITEM) => deleteTableItem(deleteData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([slug]);
        console.log("deleteMutation");
        router.push("/" + slug);
        router.refresh();
      },
      onError: (error) => {
        console.log(error);
        toast.error("Bir hata oluştu\n" + error);
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
    <div className="flex flex-wrap gap-2 w-fit">
      <Button
        className="bg-blue-500"
        onClick={() => {
          router.push("/" + slug + "/" + row.original.id);
        }}
      >
        Görüntüle
      </Button>
      <Button
        variant={"secondary"}
        onClick={() => {
          router.push("/" + slug + "/" + row.original.id + "/update");
        }}
      >
        Düzenle
      </Button>

      <Button
        variant={"destructive"}
        className="flex items-center gap-1 "
        onClick={() => {
          setOpen(true);
        }}
      >
        <BsFillTrashFill className="w-4 h-4" /> Sil
      </Button>

      <DeleteItem
        open={open}
        setOpen={setOpen}
        tableName={slug}
        id={Number(row.original.id)}
      />
    </div>
  );
}
