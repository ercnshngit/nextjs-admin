import React from "react";
import Image from "next/image";
import Link from "next/link";
import EditableContent from "@/block-renderer/utils/editable-content";

export default function FourthSection({
  buttonName,
  buttonLink,
  description,
}: {
  buttonName: string;
  buttonLink: string;
  description: string;
}) {
  return (
    <div className="bg-[url('/assets/slider-background.png')] bg-contain bg-right-bottom bg-no-repeat h-auto  ">
      <div className="grid grid-cols-2 py-10 lg:py-20 container relative">
        <div className="flex items-center justify-center">
          <div className=" flex flex-col items">
            <p className="text-primary-blue md:text-base text-xs 4xl:text-3xl">
              <EditableContent
                typeName="richtext"
                propName={"description"}
                propValue={description}
              >
                {description
                  ? description
                  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac eu et ac elit senectus mauris blandit tempor. Egestas ut tincidunt a eget ultrices risus. Et lorem ut quam turpis dictum habitant."}
              </EditableContent>
            </p>
          </div>
        </div>

        <EditableContent
          typeName="text"
          propName={"buttonhref"}
          propValue={buttonLink}
        ></EditableContent>

        <div className="flex justify-end items-center relative w-full mt-10 ">
          <EditableContent
            typeName="text"
            propName={"buttonName"}
            propValue={buttonName}
          >
            <Link href={buttonLink}>
              <button className="4xl:px-14 4xl:py-10 py-2 px-4 sm:px-8 md:py-4 bg-[#274385] text-white text-xs sm:text-base lg:text-xl 4xl:text-2xl rounded-full inline-block z-10">
                {buttonName ? buttonName : "Get Started"}
              </button>
            </Link>
          </EditableContent>
        </div>
      </div>
    </div>
  );
}
