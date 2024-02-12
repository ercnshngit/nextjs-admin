import React from "react";
import Title from "../Title";
import Description from "../Description";
import Button from "../Button";
import EditableContent from "@/block-renderer/utils/editable-content";
import { Edit } from "lucide-react";

export default function TrainingSchedule({
  image1,
  image2,
  image3,
  image4,
  title,
  description,
  buttonHref,
  buttonName,
  ...rest
}: {
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  title: string;
  description: string;
  buttonHref: string;
  buttonName: string;
}) {
  return (
    <section className="relative flex gap-2 bg-contain bg-left-bottom bg-no-repeat pb-5 pt-5 md:bg-auto md:pb-20">
      <div className="container flex h-full w-full flex-col md:flex-row">
        <div className="flex h-1/2 w-full flex-row items-center gap-2 sm:h-auto md:w-1/2 md:gap-10 ">
          <div className="flex h-full w-1/2 flex-col items-center justify-between gap-2 md:gap-10 md:pb-20 ">
            <div className="relative aspect-[2/3] w-full flex-1">
              <EditableContent
                typeName="image"
                propName={"image1"}
                propValue={image1}
              >
                <img src={image1} alt="mask-group1" className="object-fill" />
              </EditableContent>
            </div>
            <div className="relative aspect-square w-full">
              <EditableContent
                typeName="image"
                propName={"image2"}
                propValue={image2}
              >
                <img src={image2} alt="maskgroup2" className="object-fill" />
              </EditableContent>
            </div>
          </div>
          <div className="flex h-full w-1/2 flex-col items-center justify-between gap-2 md:gap-10 md:pt-20">
            <div className="relative aspect-square w-full">
              <EditableContent
                typeName="image"
                propName={"image3"}
                propValue={image3}
              >
                <img src={image3} alt="mask-group3" className="object-fill" />
              </EditableContent>
            </div>
            <div className="relative aspect-[2/3] w-full flex-1 ">
              <EditableContent
                typeName="image"
                propName={"image4"}
                propValue={image4}
              >
                <img src={image4} alt="maskgroup4" className="object-fill" />
              </EditableContent>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-end justify-center text-start md:mt-0 md:w-1/2 md:gap-10 md:py-5">
          <EditableContent typeName="text" propName={"title"} propValue={title}>
            <Title className="w-full md:mb-0 md:w-10/12">{title}</Title>
          </EditableContent>
          <EditableContent
            typeName="richtext"
            propName={"description"}
            propValue={description}
          >
            <Description className="w-full md:w-10/12">
              {description}
            </Description>
          </EditableContent>

          <EditableContent
            typeName="button"
            propName={"button"}
            propValue={buttonName}
          >
            <Button href={buttonHref}>{buttonName}</Button>
          </EditableContent>
        </div>
      </div>
    </section>
  );
}
