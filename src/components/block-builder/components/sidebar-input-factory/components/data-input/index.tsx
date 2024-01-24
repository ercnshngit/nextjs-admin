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

export default function DataInput({
  propKey,
  value,
  setValue,
  ...rest
}: {
  propKey: string;
  value: any;
  setValue: any;
}) {
  const { data } = useQuery(["general", "slugs"], () => getGeneralSlugs());
  const { data: tables } = useQuery(["tables"], () => getTablesStructure());
  console.log(tables);

  const [openDataSetModal, setOpenDataSetModal] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpenDataSetModal(true)}>
        <Suspense fallback={<Loading className="w-4 h-4" />}>
          {openDataSetModal &&
            createPortal(
              <div className=" bg-black/20 flex justify-center items-center rounded-md  absolute inset-0">
                <div className="w-1/2 bg-white h-[80vh] overflow-auto rounded-lg shadow">
                  <Ekle params={{ slug: "general" }} />
                </div>
              </div>,
              document.body
            )}
        </Suspense>
        Dataset Oluştur
      </Button>
      <Select
        onValueChange={(e) => {
          setValue(e);
        }}
        defaultValue={value}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Data set</SelectLabel>
            {data?.map((item: { slug: string }) => (
              <SelectItem
                key={item.slug}
                value={
                  "general-" +
                  String(item.slug) +
                  "-title,description,slug,image,href,button,language_code,status"
                }
              >
                {item.slug}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Table data</SelectLabel>
            {tables?.map(
              (item: { name: string; columns: { name: string }[] }) => (
                <SelectItem
                  key={item.name}
                  value={
                    "table-" +
                    String(item.name) +
                    "-" +
                    item.columns.map((c) => c.name).join(",")
                  }
                >
                  {item.name}
                </SelectItem>
              )
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
