"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

import { cn } from "@/libs/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Column } from "@tanstack/react-table";

interface CalendarDateRangePickerProps<TData, TValue> {
  className?: string;
  column?: Column<TData, TValue>;
}

export function CalendarDateRangePicker<TData, TValue>({
  className,
  column,
}: CalendarDateRangePickerProps<TData, TValue>) {
  const filterValue = column?.getFilterValue() as
    | {
        from?: Date;
        to?: Date;
      }
    | undefined;

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start h-8 text-left font-normal",
              !filterValue && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />

            {filterValue?.from ? (
              filterValue?.to ? (
                <>
                  {format(filterValue.from, "LLL dd, y", { locale: tr })} -{" "}
                  {format(filterValue.to, "LLL dd, y", { locale: tr })}
                </>
              ) : (
                format(filterValue.from, "LLL dd, y", { locale: tr })
              )
            ) : (
              <span>Tarih aralığı seçin</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={filterValue ? filterValue.from : new Date(Date.now())}
            selected={{
              from: filterValue?.from,
              to: filterValue?.to,
            }}
            onSelect={(newDate) => {
              column?.setFilterValue({
                from: newDate?.from ? newDate.from : undefined,
                to: newDate?.to ? newDate.to : undefined,
              });
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
