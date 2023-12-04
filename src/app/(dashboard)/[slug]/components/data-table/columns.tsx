"use client";

import { DataTableColumnHeader } from "@/components/datatable/header/datatable-sortable-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IMAGE_URL, getDatabaseTable } from "@/config/general";
import { translate } from "@/langs";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownCircleIcon,
  ArrowRightCircleIcon,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ColumnCellFactory from "./column-cell-factory";
import { DataTableRowActions } from "./components/data-table-row-actions";

export type ColumnDefWithName<TData> =
  | ColumnDef<TData>
  | {
      name: string;
    };

export const columns: (slug: string) => ColumnDefWithName<any>[] = (slug) => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...(getDatabaseTable(slug)?.columns.map((tableColumn) => ({
      id: tableColumn.name,
      accessorKey: tableColumn.name,
      header: ({ column }: { column: any }) => (
        <DataTableColumnHeader
          column={column}
          title={translate(
            getDatabaseTable(slug)?.name + "/" + tableColumn.name
          )}
        />
      ),
      cell: ({ row }: { row: any }) => {
        return (
          <ColumnCellFactory
            value={row.original[tableColumn.name]}
            column={tableColumn}
          />
        );
      },
      ...(tableColumn.filterable
        ? {
            filterFn: (row: any, id: any, value: any) => {
              return value?.includes(row.getValue(id));
            },
          }
        : {}),
    })) ?? []),
    {
      id: "actions",
      header: () => <div className="text-center">İşlemler</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <DataTableRowActions row={row} slug={slug} />
          </div>
        );
      },
    },
  ];
};
