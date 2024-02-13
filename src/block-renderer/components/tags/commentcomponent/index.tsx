import EditableContent from "@/block-renderer/utils/editable-content";
import React from "react";
import Title from "../Title";

export default function CommentComponent({
  content,
  fname,
  lname,
  title,
  subtitle,
}: {
  content: string;
  fname: string;
  lname: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="container flex flex-col">
      <EditableContent
        typeName="richtext"
        propName={"content"}
        propValue={content}
      />
      <EditableContent typeName="text" propName={"fname"} propValue={fname} />
      <EditableContent typeName="text" propName={"lname"} propValue={lname} />
      <EditableContent
        typeName="text"
        propName={"subtitle"}
        propValue={subtitle}
      />
      <div className="flex w-full flex-col ">
        <EditableContent typeName="text" propName={"title"} propValue={title}>
          <Title>{title}</Title>
        </EditableContent>
        <div className=" mb-2 mt-2 w-full border-[1px] border-secondary-blue shadow-xl md:mb-8"></div>
      </div>
      <div className="-mr-5 mt-11 w-full self-stretch text-xl font-bold text-text-black max-md:mt-10 max-md:max-w-full lg:text-2xl ">
        {subtitle}
      </div>
      <div className="-mr-5 mt-11 w-full self-stretch text-justify text-xs text-text-black max-md:mt-10 max-md:max-w-full md:text-xl">
        {content}
      </div>

      <div className=" mt-8 flex flex-col items-start gap-2 text-base font-bold lg:mt-16 lg:text-xl">
        <p className="whitespace-nowrap text-text-black">
          {fname}
          {lname.split(" ")[1].charAt(0)}.
        </p>
      </div>
    </div>
  );
}
