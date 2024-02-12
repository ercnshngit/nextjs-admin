"use client";
import { motion } from "framer-motion";
import { sliderContainer } from "@/libs/animation";
import Title from "../Title";
import Description from "../Description";
import Button from "../Button";
import AnimatedCounter from "@/libs/animated-counter";
import { Edit } from "lucide-react";
import EditableContent from "@/block-renderer/utils/editable-content";

export default function ConvalNumbers({
  title,
  description,
  buttonName,
  buttonHref,
  number1,
  title1,
  number2,
  title2,
  number3,
  title3,
  number4,
  title4,
}: {
  title: string;
  description: string;
  buttonName: string;
  buttonHref: string;
  number1: number;
  title1: string;
  number2: number;
  title2: string;
  number3: number;
  title3: string;
  number4: number;
  title4: string;
}) {
  return (
    <motion.section
      variants={sliderContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className=" bg-[#F2F3F4] py-6 text-secondary-blue md:py-10"
    >
      <div className="container flex flex-col justify-between gap-4 md:flex-row">
        <div className="flex flex-col justify-between">
          <EditableContent
            typeName="number"
            propName={"number1"}
            propValue={number1}
          />
          <EditableContent
            typeName="text"
            propName={"title1"}
            propValue={title1}
          />
          <EditableContent
            typeName="number"
            propName={"number2"}
            propValue={number2}
          />
          <EditableContent
            typeName="text"
            propName={"title2"}
            propValue={title2}
          />
          <EditableContent
            typeName="number"
            propName={"number3"}
            propValue={number3}
          />
          <EditableContent
            typeName="text"
            propName={"title3"}
            propValue={title3}
          />
          <EditableContent
            typeName="number"
            propName={"number4"}
            propValue={number4}
          />
          <EditableContent
            typeName="text"
            propName={"title4"}
            propValue={title4}
          />
          <EditableContent
            typeName="text"
            propName={"title"}
            propValue={title}
          />
          <EditableContent
            typeName="richtext"
            propName={"description"}
            propValue={description}
          />
          <EditableContent
            typeName="text"
            propName={"buttonName"}
            propValue={buttonName}
          />
          <EditableContent
            typeName="text"
            propName={"buttonHref"}
            propValue={buttonHref}
          />
          <Title className="text-icon-blue">{title}</Title>
          <Description className="font-light lg:max-w-md">
            {description}
          </Description>
          <Button href={buttonHref} variant="secondary">
            {buttonName}
          </Button>
        </div>
        <div className="grid h-min w-full grid-cols-2 grid-rows-2 gap-2 md:w-1/3">
          <AnimatedCounter
            from={0}
            to={number1}
            description={title1}
            duration={10}
          />
          <AnimatedCounter
            from={0}
            to={number2}
            description={title2}
            duration={10}
          />
          <AnimatedCounter
            from={0}
            to={number3}
            description={title3}
            duration={10}
          />
          <AnimatedCounter
            from={0}
            to={number4}
            description={title4}
            duration={10}
          />
        </div>
      </div>
    </motion.section>
  );
}
