import EditableContent from "@/block-renderer/utils/editable-content";
import { Edit } from "lucide-react";
import Link from "next/link";

export default function FirstSection({
  title,
  description,
  buttonhref,
  buttonName,
  image,
}: {
  title: string;
  description: string;
  buttonhref: string;
  buttonName: string;
  image: string;
}) {
  return (
    <div className="container flex md:flex-row flex-col-reverse mb-20">
      <div className="flex  md:w-1/2 w-full items-end md:items-center">
        <div className="h-auto flex flex-1 flex-col items-start md:justify-center lg:gap-10 md:gap-5 gap-3 justify-evenly">
          <div className="text-primary-blue font-semibold 4xl:text-2xl 2xl:text-xl xl:text-lg lg:text-base md:text-xs text-sm bg-blue-500">
            <EditableContent
              typeName="text"
              propName={"title"}
              propValue={title}
            >
              <div className="text-[#181818] font-black 4xl:text-7xl 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-xl text-xl">
                {title}
              </div>
            </EditableContent>
          </div>
          <EditableContent
            typeName="richtext"
            propName={"description"}
            propValue={description}
          >
            <p className="text-[#454545] 4xl:text-xl xl:text-base  lg:text-xs text-xs">
              {description}
            </p>
          </EditableContent>

          <EditableContent
            typeName="text"
            propName={"buttonhref"}
            propValue={buttonhref}
          ></EditableContent>

          <EditableContent
            typeName="text"
            propName={"buttonName"}
            propValue={buttonName}
          >
            <Link
              href={buttonhref}
              className="bg-primary-blue md:px-6 md:py-4 px-3 py-2 rounded-3xl text-white 4xl:text-xl xl:text-base lg:text-sm text-xs"
            >
              {buttonName}
            </Link>
          </EditableContent>
        </div>
      </div>
      <div className="flex md:w-[33vw] items-center md:items-start md:justify-center justify-start self-center w-1/2">
        <EditableContent typeName="image" propName={"image"} propValue={image}>
          <div className="relative w-full aspect-square md:mb-0 mb-5 self-center">
            <img src={image} alt="BusinessMan" className="object-fill" />
          </div>
        </EditableContent>
      </div>
    </div>
  );
}
