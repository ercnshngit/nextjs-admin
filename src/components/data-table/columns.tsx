"use client";

import { DataTableColumnHeader } from "@/components/datatable/header/datatable-sortable-header";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslate } from "@/langs";
import { ColumnDef } from "@tanstack/react-table";
import ColumnCellFactory from "./column-cell-factory";
import { DataTableRowActions } from "./components/data-table-row-actions";
import { useDatabase } from "@/hooks/use-database";
import { Column } from "@/types/config";

export type ColumnDefWithName<TData> =
  | ColumnDef<TData>
  | {
      name: string;
    };

export const columns: (
  slug: string,
  columns: Column[]
) => ColumnDefWithName<any>[] = (slug, columns) => {
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
    ...(columns.map((tableColumn) => ({
      id: tableColumn.name,
      accessorKey: tableColumn.name,
      header: ({ column }: { column: any }) => (
        <DataTableColumnHeader
          column={column}
          title={tableColumn.name + "/" + tableColumn.name}
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
      ...(tableColumn.is_filterable
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
