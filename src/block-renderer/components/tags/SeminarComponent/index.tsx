import React from "react";
import Link from "next/link";
import EditableContent from "@/block-renderer/utils/editable-content";

export default function Seminar({
  title,
  description,
  image,
  buttonHref,
  buttonName,
}: {
  title: string;
  description: string;
  image: string;
  buttonName: string;
  buttonHref: string;
}) {
  return (
    <div className="flex md:flex-row flex-col gap-10 container">
      <div className="relative h-[280px] md:w-[280px] w-full overflow-hidden  shadow ">
        <EditableContent typeName="image" propName={"image"} propValue={image}>
          <img
            src={image}
            alt="hero"
            className={"object-cover object-center"}
          />
        </EditableContent>
      </div>
      <div className="flex md:w-2/3 w-full flex-col gap-6">
        <EditableContent typeName="text" propName={"title"} propValue={title}>
          <h1 className="text-base font-bold md:text-xl lg:text-4xl">
            {title}
          </h1>
        </EditableContent>
        <EditableContent
          typeName="richtext"
          propName={"description"}
          propValue={description}
        >
          <p className="text-base text-[#1A1A1A] ">{description}</p>
        </EditableContent>
        <EditableContent
          typeName="text"
          propName={"buttonHref"}
          propValue={buttonHref}
        ></EditableContent>
        <EditableContent
          typeName="text"
          propName={"buttonName"}
          propValue={buttonName}
        >
          <Link href={buttonHref}>
            <button className="bg-primary-blue md:px-6 md:py-4 px-3 py-2 rounded-3xl text-white 4xl:text-xl xl:text-base lg:text-sm text-xs">
              {buttonName}
            </button>
          </Link>
        </EditableContent>
      </div>
    </div>
  );
}
