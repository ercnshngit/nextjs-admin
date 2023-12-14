"use client";

import DeleteItem from "@/components/delete-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";

interface DataTableRowActionsProps {
  row: any;
  slug: string;
}

export function DataTableRowActions({ row, slug }: DataTableRowActionsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-2 w-fit">
      <Button
        className="bg-blue-500"
        onClick={() => {
          router.push("/dashboard/" + slug + "/" + row.original.id);
        }}
      >
        Görüntüle
      </Button>
      <Button
        variant={"secondary"}
        onClick={() => {
          router.push("/dashboard/" + slug + "/" + row.original.id + "/update");
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
