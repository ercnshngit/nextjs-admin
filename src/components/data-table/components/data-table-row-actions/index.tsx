"use client";

import DeleteItem from "@/components/delete-dialog-table-item";
import { Button } from "@/components/ui/button";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";

interface DataTableRowActionsProps {
  row: any;
  slug: string;
  buttons?: (row: Row<any>) => React.ReactNode;
  table?: DatabaseTableDto;
}

export function DataTableRowActions({
  row,
  slug,
  buttons,
  table,
}: DataTableRowActionsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-fit flex-wrap gap-2">
      {buttons ? (
        buttons(row)
      ) : (
        <>
          <Button
            className="bg-blue-500"
            onClick={() => {
              router.push("/dashboard/" + slug + "/" + row.original.id);
            }}
          >
            Görüntüle
          </Button>
          {table?.can_update && (
            <Button
              variant={"secondary"}
              onClick={() => {
                router.push(
                  "/dashboard/" + slug + "/" + row.original.id + "/update"
                );
              }}
            >
              Düzenle
            </Button>
          )}
        </>
      )}

      {table?.can_delete && (
        <>
          <Button
            variant={"destructive"}
            className="flex items-center gap-1 "
            onClick={() => {
              setOpen(true);
            }}
          >
            <BsFillTrashFill className="h-4 w-4" /> Sil
          </Button>

          <DeleteItem
            open={open}
            setOpen={setOpen}
            tableName={slug}
            id={Number(row.original.id)}
          />
        </>
      )}
    </div>
  );
}
