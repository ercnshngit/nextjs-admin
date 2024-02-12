import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
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
import { cn } from "@/libs/utils";
import { BlockDto } from "@/services/dto/block.dto";
import { useState } from "react";
export default function BlocksDropdown({
  value,
  blocks,
  setValue,
}: {
  value: string;
  blocks: { label: string; value: string }[];
  setValue: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground"
          )}
        >
          {value
            ? blocks.find((block) => block.value === value)?.label
            : "Select block"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {blocks.map((block) => (
              <CommandItem
                value={block.label}
                key={block.value}
                onSelect={() => {
                  setOpen(false);
                  setValue(block.value);
                }}
              >
                {block.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    block.value === value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
