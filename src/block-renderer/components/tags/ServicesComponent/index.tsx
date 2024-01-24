import React from "react";
import Title from "../Title";
import Description from "../Description";
import MotionDiv from "./components/MotionDiv";
import EditableContent from "@/block-renderer/utils/editable-content";
import { control } from "@/block-renderer/utils/control-type";
import EditableData from "@/block-renderer/utils/editable-data";

export default function ServicesComponent({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: {
    href: string;
    src: string;
    title: string;
  }[];
}) {
  return (
    <section className="container relative flex flex-col items-center py-10 text-center md:py-20 ">
      <EditableContent propName={"title"} propValue={title}>
        <Title>{control(title)}</Title>
      </EditableContent>
      <EditableContent propName={"description"} propValue={description}>
        <Description className="max-w-2xl">{control(description)}</Description>
      </EditableContent>
      <EditableData
        datasetInfo={String(items)}
        component={({ data, columns }: { data: any; columns: string[] }) => {
          const parsedItems = data.map((item: any) => ({
            href: item.href || "#",
            src: item.image,
            title: item.title,
          }));

          const beklenen = ["href", "image", "title"];

          return (
            <>
              {beklenen.map((bekle: any) => {
                return !columns.includes(bekle) && <p>{bekle} uyumlu değil</p>;
              })}
              <MotionDiv items={parsedItems} />
            </>
          );
        }}
      />
    </section>
  );
}
