"use client";

import {
  FieldErrors,
  SetFieldValue,
  SetValueConfig,
  UseFormRegister,
} from "react-hook-form";
import Label from "../Label";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import { CheckIcon, LucideProps, icons } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { iconNames } from "../../../../libs/lucide-icons";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
export default function IconSelect({
  field,
  table,
  register,
  errors,
  defaultValue,
  setValue,
}: {
  field: DataBaseTableColumnDto;
  table: DatabaseTableDto;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  defaultValue?: string;
  setValue: SetFieldValue<any>;
}) {
  return (
    <div
      key={field.name}
      className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200"
    >
      <Label field={field} table={table} />
      <input
        type="hidden"
        {...register(field.name)}
        defaultValue={defaultValue}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              !defaultValue && "text-muted-foreground"
            )}
          >
            {defaultValue
              ? iconNames.find((icon) => icon === defaultValue)
              : "Select Icon"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full bg-red-500 p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="h-60 overflow-y-auto">
              {iconNames.map((icon) => {
                const Icon = icons[icon as keyof typeof icons];

                return (
                  <CommandItem
                    value={icon}
                    key={icon}
                    className="flex items-center gap-2"
                    onSelect={() => {
                      setValue("icon", icon);
                    }}
                  >
                    {Icon && <Icon />}
                    {icon.substring(0, 10) + "..."}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        icon === defaultValue ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {errors[field.name] && <span>Bu alan gereklidir</span>}
    </div>
  );
}

const Icon = ({
  name,
  color,
  size,
}: {
  name: keyof typeof icons;
  color?: LucideProps["color"];
  size?: LucideProps["size"];
}) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};
