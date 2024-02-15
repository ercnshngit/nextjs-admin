"use client";
import { motion } from "framer-motion";
import { sliderContainer } from "@/libs/animation";
import Title from "../Title";
import Description from "../Description";
import Button from "../Button";
import AnimatedCounter from "@/libs/animated-counter";
import { Edit } from "lucide-react";
import EditableContent from "@/block-renderer/utils/editable-content";
import EditableData from "@/block-renderer/utils/editable-data";
import { useQuery } from "@tanstack/react-query";
import { getGeneralBySlug } from "@/services/dashboard";

export default function ConvalNumbers({
  title,
  description,
  buttonName,
  buttonHref,
}: {
  title: string;
  description: string;
  buttonName: string;
  buttonHref: string;
}) {
  const { data, isError } = useQuery(["numbers"], () =>
    getGeneralBySlug("numbers")
  );

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
          <EditableContent typeName="text" propName={"title"} propValue={title}>
            <Title className="text-icon-blue">{title}</Title>
          </EditableContent>
          <EditableContent
            typeName="textarea"
            propName={"description"}
            propValue={description}
          >
            <Description className="font-light lg:max-w-md">
              {description}
            </Description>
          </EditableContent>

          <EditableContent
            typeName="text"
            propName={"buttonName"}
            propValue={buttonName}
          >
            <Button href={buttonHref} variant="secondary">
              {buttonName}
            </Button>
          </EditableContent>
          <EditableContent
            typeName="text"
            propName={"buttonHref"}
            propValue={buttonHref}
          />
        </div>
        <div className="grid h-min w-full grid-cols-2 grid-rows-2 gap-2 md:w-1/3">
          {data && (
            <EditableData
              data={data}
              description="Genel kismindan duzenlenir."
              tableName="general"
              queryKey={["numbers"]}
            >
              {data.map((item) => (
                <AnimatedCounter
                  key={item.id}
                  from={0}
                  to={Number(item.description)}
                  description={item.title}
                  duration={10}
                />
              ))}
            </EditableData>
          )}
        </div>
      </div>
    </motion.section>
  );
}
