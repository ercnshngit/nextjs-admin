"use client";

import { DataTableColumnHeader } from "@/components/datatable/header/datatable-sortable-header";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslate } from "@/langs";
import { ColumnDef, Row } from "@tanstack/react-table";
import ColumnCellFactory from "./column-cell-factory";
import { DataTableRowActions } from "./components/data-table-row-actions";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import { Button } from "../ui/button";
import Link from "next/link";

export type ColumnDefWithName<TData> =
  | ColumnDef<TData>
  | {
      name: string;
    };

export const columns: (
  slug: string,
  columns: DataBaseTableColumnDto[],
  buttons?: (row: Row<any>) => React.ReactNode,
  table?: any,
  translate?: any
) => ColumnDefWithName<any>[] = (slug, columns, buttons, table, translate) => {
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
      id: String(tableColumn.name),
      accessorKey: tableColumn.name,
      header: ({ column }: { column: any }) => (
        <DataTableColumnHeader column={column} title={tableColumn.name} />
      ),
      cell: ({ row }: { row: any }) => {
        return (
          <ColumnCellFactory
            value={row.original[tableColumn.name]}
            column={tableColumn}
          />
        );
      },
      ...(tableColumn.is_hidden
        ? {
            hidden: true,
          }
        : {}),
      ...(tableColumn.is_filterable
        ? {
            filterFn: (row: any, id: any, value: any) => {
              return value?.includes(row.getValue(id));
            },
          }
        : {}),
    })) ?? []),

    ...(columns.filter((c) => c.column_relations.length > 0).length > 0
      ? [
          {
            id: "relations",
            header: () => <div className="text-center">Bagli Tablolar</div>,
            cell: ({ row }: { row: any }) => (
              <div className="flex flex-col gap-1">
                {columns
                  .filter((c) => c.column_relations.length > 0)
                  .map((tableColumn) => {
                    const relation = tableColumn.column_relations?.[0];

                    return (
                      <Button
                        key={tableColumn.name}
                        variant={"outline"}
                        asChild
                      >
                        <Link
                          href={{
                            pathname: `/dashboard/${relation?.referenced_table.name}`,
                            query: {
                              [relation.referenced_column.name]:
                                row.original[tableColumn.name],
                            },
                          }}
                        >
                          {translate(relation?.referenced_table.name)}
                        </Link>
                      </Button>
                    );
                  })}
              </div>
            ),
          },
        ]
      : []),
    {
      id: "actions",
      header: () => <div className="text-center">İşlemler</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <DataTableRowActions
              row={row}
              slug={slug}
              buttons={buttons}
              table={table}
            />
          </div>
        );
      },
    },
  ];
};
