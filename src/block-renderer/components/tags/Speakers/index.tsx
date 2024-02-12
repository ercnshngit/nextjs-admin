import EditableContent from "@/block-renderer/utils/editable-content";
import React from "react";

export default function Speaker({
  title,
  image,
  name,
  description,
}: {
  title: string;
  image: string;
  name: string;
  description: string;
}) {
  return (
    <div className="flex flex-col bg-[#F5F5F5] mt-12">
      <EditableContent typeName="text" propName={"title"} propValue={title} />
      <EditableContent typeName="text" propName={"image"} propValue={image} />
      <EditableContent typeName="text" propName={"name"} propValue={name} />
      <EditableContent
        typeName="richtext"
        propName={"description"}
        propValue={description}
      />
      <div className="container flex-col gap-10 flex mb-10">
        <h1 className="text-[#002B64] font-bold text-3xl mt-10">{title}</h1>
        <div className="flex md:flex-row flex-col items-center relative gap-10">
          <img
            src={image}
            alt="speakers"
            height={330}
            width={330}
            className="object-contain"
          />

          <div>
            <h1 className="text-[#002B64] font-bold text-3xl">{name}</h1>
            <p className="max-w-[800px] text-lg">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
