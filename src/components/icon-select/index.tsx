import { CheckIcon, LucideProps } from "lucide-react";
import { RegisterOptions } from "react-hook-form";

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
import { CaretSortIcon } from "@radix-ui/react-icons";
import { icons } from "lucide-react";
import { Button } from "../ui/button";
import { iconNames } from "../../../constants";
export default function IconSelect({
  field,
  form,
}: {
  form: any;
  field: RegisterOptions;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? iconNames.find((icon) => icon === field.value)
              : "Select Icon"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="min-w-full p-0 self-start">
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
                    form.setValue("icon", icon);
                  }}
                >
                  {Icon && <Icon />}
                  {icon.substring(0, 10) + "..."}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      icon === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
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
