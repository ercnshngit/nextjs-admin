import Ekle from "@/app/dashboard/[slug]/ekle/page";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getGeneralSlugs,
  getTable,
  getTablesConfigs,
  getTablesStructure,
} from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { createPortal } from "react-dom";

export default function SelectInput({
  propKey,
  value,
  setValue,
  options,
  ...rest
}: {
  propKey: string;
  value: any;
  setValue: any;
  options?: { label: string; value: any }[];
}) {
  return (
    <div>
      <Select
        onValueChange={(e) => {
          setValue(e);
        }}
        defaultValue={value}
      >
        <SelectTrigger className="bg-white text-black">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options?.map((item) => (
              <SelectItem key={item.value} value={String(item.value)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
