"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "./datatable-view-options";

import { DataTableFacetedFilter } from "./datatable-faceted-filter";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CalendarDateRangePicker } from "./date-range-picker";
import { useTranslate } from "@/langs";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterables?: any[] | null;
  searchables?: any[] | null;
  tableName: string;
  databaseTableColumns: DataBaseTableColumnDto[];
}

export function DataTableToolbar<TData>({
  table,
  filterables,
  searchables,
  tableName,
  databaseTableColumns,
}: DataTableToolbarProps<TData>) {
  const { translate } = useTranslate();

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-center flex-1 space-x-2 md:flex-row max-md:space-y-2">
        {searchables?.map((searchable) => (
          <Input
            key={searchable.name}
            placeholder={
              translate(tableName + "/" + searchable.name) + " göre ara"
            }
            value={
              (table.getColumn(searchable.name)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn(searchable.name)
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px] bg-white"
          />
        ))}
        {filterables &&
          filterables?.map((filterable) => {
            if (!filterable) return;
            if (table.getColumn(filterable.name)) {
              return (
                <DataTableFacetedFilter
                  key={filterable.name}
                  column={table.getColumn(filterable.name)}
                  title={
                    translate(tableName + "/" + filterable.name) +
                    " göre filtrele"
                  }
                  options={filterable.options}
                />
              );
            }
          })}

        {/* {databaseTableColumns?.find(
          (column) => column.name === "created_at"
        ) && <CalendarDateRangePicker column={table.getColumn("created_at")} />} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Temizle
            <Cross2Icon className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
