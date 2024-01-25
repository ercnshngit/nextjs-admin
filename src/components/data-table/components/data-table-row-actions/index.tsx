"use client";

import DeleteItem from "@/components/delete-dialog";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";

interface DataTableRowActionsProps {
  row: any;
  slug: string;
  buttons?: (row: Row<any>) => React.ReactNode;
}

export function DataTableRowActions({
  row,
  slug,
  buttons,
}: DataTableRowActionsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-2 w-fit">
      {JSON.stringify(buttons)}
      {buttons ? (
        buttons(row)
      ) : (
        <>
          <Button
            className="bg-blue-500"
            onClick={() => {
              router.push(
                "/dashboard/" +
                  (slug === "type"
                    ? "menu_type" + "/" + row.original.id
                    : slug + "/" + row.original.id)
              );
            }}
          >
            Görüntüle
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => {
              router.push(
                "/dashboard/" +
                  (slug === "type"
                    ? "menu_type" + "/" + row.original.id
                    : slug + "/" + row.original.id)
              );
            }}
          >
            Düzenle
          </Button>
        </>
      )}

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
